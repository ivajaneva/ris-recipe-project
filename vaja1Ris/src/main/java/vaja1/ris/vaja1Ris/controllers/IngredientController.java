package vaja1.ris.vaja1Ris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import vaja1.ris.vaja1Ris.dao.IngredientAlternativeDao;
import vaja1.ris.vaja1Ris.dao.IngredientDao;
import vaja1.ris.vaja1Ris.dao.RecipesDao;
import vaja1.ris.vaja1Ris.models.Ingredient;
import vaja1.ris.vaja1Ris.models.IngredientAlternative;
import vaja1.ris.vaja1Ris.models.Recipe;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@CrossOrigin(origins ="*")
@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    private IngredientDao ingredientDao;

    @Autowired
    private RecipesDao recipesDao;

    @Autowired
    private IngredientAlternativeDao ingredientAlternativeDao;

    private static final Pattern AMOUNT_PATTERN = Pattern.compile("^\\s*(\\d+(?:[.,]\\d+)?(?:\\s+\\d+/\\d+)?|\\d+/\\d+)");
    private static final Set<String> UNIT_TOKENS = Set.of(
            "g", "kg", "ml", "l", "tbsp", "tsp", "teaspoon", "tablespoon",
            "cup", "cups", "piece", "pieces", "clove", "cloves"
    );

    /**
     * Vrne vse sestavine iz baze
     */
    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientDao.findAll();
    }

    /**
     * Osnovni endpoint za branje hranilne vrednosti brez zamenjav.
     */
    @GetMapping("/recipe/{recipeId}/nutrition")
    public Map<String, Object> getNutritionForRecipe(
            @PathVariable Long recipeId,
            @RequestParam(defaultValue = "1") int portions
    ) {
        Recipe recipe = recipesDao.findById(recipeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found"));

        return calculateNutritionResponse(recipe, recipe.getIngredients(), Math.max(portions, 1), Collections.emptyMap());
    }

    /**
     * Recalculates nutrition using optional substitutions provided by the frontend.
     */
    @PostMapping("/recipe/{recipeId}/nutrition")
    public Map<String, Object> calculateNutritionWithSubstitutions(
            @PathVariable Long recipeId,
            @RequestBody(required = false) NutritionRequest request
    ) {
        Recipe recipe = recipesDao.findById(recipeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Recipe not found"));

        int portions = 1;
        Map<String, Long> substitutions = Collections.emptyMap();
        String ingredientsText = recipe.getIngredients();

        if (request != null) {
            portions = Math.max(request.getPortions(), 1);
            substitutions = request.getSubstitutions() == null
                    ? Collections.emptyMap()
                    : normalizeKeys(request.getSubstitutions());
            if (request.getIngredients() != null) {
                ingredientsText = request.getIngredients();
            }
        }

        return calculateNutritionResponse(recipe, ingredientsText, portions, substitutions);
    }

    /**
     * Returns configured alternatives for a specific ingredient so frontend can offer replacements.
     */
    @GetMapping("/{ingredientId}/alternatives")
    public List<AlternativeResponse> getAlternatives(@PathVariable Long ingredientId) {
        Ingredient ingredient = ingredientDao.findById(ingredientId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ingredient not found"));

        List<IngredientAlternative> alternatives = ingredientAlternativeDao.findByIngredient_Id(ingredient.getId());
        List<AlternativeResponse> responses = new ArrayList<>();

        for (IngredientAlternative alternative : alternatives) {
            responses.add(new AlternativeResponse(
                    alternative.getId(),
                    alternative.getAlternative().getId(),
                    alternative.getAlternative().getName(),
                    alternative.getNote()
            ));
        }

        return responses;
    }

    private Map<String, Object> calculateNutritionResponse(Recipe recipe, String ingredientsText, int portions, Map<String, Long> substitutions) {
        List<IngredientQuantity> ingredientQuantities = extractIngredientQuantities(ingredientsText);

        double totalCalories = 0;
        double totalProtein = 0;
        double totalCarbs = 0;
        double totalFat = 0;

        List<Map<String, Object>> ingredientDetails = new ArrayList<>();

        for (IngredientQuantity iq : ingredientQuantities) {
            String normalizedName = normalizeName(iq.getName());
            Ingredient ingredient = resolveIngredient(normalizedName, substitutions);

            double factor = iq.getAmount() / getUnitAmount(ingredient.getUnit());
            factor *= portions;

            double calories = ingredient.getCalories() * factor;
            double protein = ingredient.getProtein() * factor;
            double carbs = ingredient.getCarbs() * factor;
            double fat = ingredient.getFat() * factor;

            totalCalories += calories;
            totalProtein += protein;
            totalCarbs += carbs;
            totalFat += fat;

            Map<String, Object> ingredientInfo = new HashMap<>();
            ingredientInfo.put("requestedIngredient", normalizedName);
            ingredientInfo.put("ingredientId", ingredient.getId());
            ingredientInfo.put("name", ingredient.getName());
            ingredientInfo.put("amount", iq.getAmount() * portions);
            ingredientInfo.put("unit", iq.getUnit());
            ingredientInfo.put("calories", calories);
            ingredientInfo.put("protein", protein);
            ingredientInfo.put("carbs", carbs);
            ingredientInfo.put("fat", fat);
            ingredientInfo.put("substituted", substitutions.containsKey(normalizedName));

            ingredientDetails.add(ingredientInfo);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("recipeId", recipe.getId());
        response.put("recipeName", recipe.getName());
        response.put("portions", portions);
        response.put("ingredients", ingredientDetails);
        response.put("totalCalories", totalCalories);
        response.put("totalProtein", totalProtein);
        response.put("totalCarbs", totalCarbs);
        response.put("totalFat", totalFat);
        response.put("dailyCalories", 2000.0);
        response.put("percentageOfDaily", totalCalories / 2000.0 * 100);

        return response;
    }

    private Ingredient resolveIngredient(String normalizedName, Map<String, Long> substitutions) {
        Long replacementId = substitutions.get(normalizedName);
        if (replacementId != null) {
            return ingredientDao.findById(replacementId)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "Alternative ingredient with id " + replacementId + " not found"));
        }

        Optional<Ingredient> ingredient = ingredientDao.findByNameIgnoreCase(normalizedName);
        if (ingredient.isPresent()) {
            return ingredient.get();
        }

        String singular = singularizeName(normalizedName);
        if (!singular.equals(normalizedName)) {
            return ingredientDao.findByNameIgnoreCase(singular)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Ingredient '" + normalizedName + "' missing in DB"));
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ingredient '" + normalizedName + "' missing in DB");
    }

    private Map<String, Long> normalizeKeys(Map<String, Long> substitutions) {
        Map<String, Long> normalized = new HashMap<>();
        for (Map.Entry<String, Long> entry : substitutions.entrySet()) {
            if (entry.getKey() != null && entry.getValue() != null) {
                normalized.put(normalizeName(entry.getKey()), entry.getValue());
            }
        }
        return normalized;
    }

    private String normalizeName(String name) {
        if (name == null) {
            return "";
        }
        String normalized = name.trim().toLowerCase();
        normalized = normalized.replaceAll("\\([^)]*\\)", "");
        normalized = normalized.replace("for frying", "");
        normalized = normalized.replaceAll("\\s+", " ").trim();
        return normalized;
    }

    /**
     * Pretvori enoto iz baze v numeric value za izracun faktorja.
     */
    private double getUnitAmount(String unit) {
        return switch (unit) {
            case "piece", "1 crust" -> 1.0;
            case "100g", "100ml" -> 100.0;
            case "10g" -> 10.0;
            default -> 1.0;
        };
    }

    /**
     * Iz stringa recepta potegnemo ime, kolicino in enoto.
     */
    private List<IngredientQuantity> extractIngredientQuantities(String ingredientsText) {
        if (ingredientsText == null || ingredientsText.trim().isEmpty()) {
            return List.of();
        }

        List<IngredientQuantity> list = new ArrayList<>();
        String[] parts = ingredientsText.split("[\\n,]");

        for (String part : parts) {
            String trimmed = part.trim();
            if (trimmed.isEmpty()) {
                continue;
            }

            double amount = 0;
            String unitStr = "";
            String namePart = trimmed;

            Matcher matcher = AMOUNT_PATTERN.matcher(trimmed);
            if (matcher.find()) {
                amount = parseAmount(matcher.group(1));
                namePart = trimmed.substring(matcher.end()).trim();
            }

            if (!namePart.isEmpty()) {
                String[] tokens = namePart.split("\\s+", 2);
                String possibleUnit = tokens[0].toLowerCase();
                if (UNIT_TOKENS.contains(possibleUnit)) {
                    unitStr = tokens[0];
                    namePart = tokens.length > 1 ? tokens[1].trim() : "";
                }
            }

            String name = namePart.trim();
            if (name.isEmpty()) {
                continue;
            }

            list.add(new IngredientQuantity(name, amount, unitStr));
        }

        return list;
    }

    private double parseAmount(String token) {
        if (token == null || token.isBlank()) {
            return 0;
        }

        String normalized = token.trim().replace(",", ".");
        String[] parts = normalized.split("\\s+");
        double total = 0;

        for (String part : parts) {
            if (part.contains("/")) {
                total += parseFraction(part);
            } else {
                try {
                    total += Double.parseDouble(part);
                } catch (NumberFormatException ignored) {
                }
            }
        }

        return total;
    }

    private double parseFraction(String token) {
        String[] pieces = token.split("/");
        if (pieces.length != 2) {
            return 0;
        }

        try {
            double numerator = Double.parseDouble(pieces[0].trim());
            double denominator = Double.parseDouble(pieces[1].trim());
            if (denominator == 0) {
                return 0;
            }
            return numerator / denominator;
        } catch (NumberFormatException ignored) {
            return 0;
        }
    }

    private String singularizeName(String name) {
        String[] parts = name.split("\\s+");
        if (parts.length == 0) {
            return name;
        }

        int lastIndex = parts.length - 1;
        parts[lastIndex] = singularizeToken(parts[lastIndex]);
        return String.join(" ", parts).trim();
    }

    private String singularizeToken(String token) {
        if (token.endsWith("ies") && token.length() > 3) {
            return token.substring(0, token.length() - 3) + "y";
        }
        if (token.endsWith("es") && token.length() > 2) {
            return token.substring(0, token.length() - 2);
        }
        if (token.endsWith("s") && token.length() > 1) {
            return token.substring(0, token.length() - 1);
        }
        return token;
    }

    /**
     * Helper class za hranjenje ime + kolicina + enota.
     */
    private static class IngredientQuantity {
        private final String name;
        private final double amount;
        private final String unit;

        public IngredientQuantity(String name, double amount, String unit) {
            this.name = name;
            this.amount = amount;
            this.unit = unit;
        }

        public String getName() {
            return name;
        }

        public double getAmount() {
            return amount;
        }

        public String getUnit() {
            return unit;
        }
    }

    public static class NutritionRequest {
        private int portions = 1;
        private Map<String, Long> substitutions = new HashMap<>();
        private String ingredients;

        public NutritionRequest() {
        }

        public NutritionRequest(int portions, Map<String, Long> substitutions) {
            this.portions = portions;
            this.substitutions = substitutions;
        }

        public int getPortions() {
            return portions;
        }

        public void setPortions(int portions) {
            this.portions = portions;
        }

        public Map<String, Long> getSubstitutions() {
            return substitutions;
        }

        public void setSubstitutions(Map<String, Long> substitutions) {
            this.substitutions = substitutions;
        }

        public String getIngredients() {
            return ingredients;
        }

        public void setIngredients(String ingredients) {
            this.ingredients = ingredients;
        }
    }

    public static class AlternativeResponse {
        private final Long relationId;
        private final Long alternativeId;
        private final String name;
        private final String note;

        public AlternativeResponse(Long relationId, Long alternativeId, String name, String note) {
            this.relationId = relationId;
            this.alternativeId = alternativeId;
            this.name = name;
            this.note = note;
        }

        public Long getRelationId() {
            return relationId;
        }

        public Long getAlternativeId() {
            return alternativeId;
        }

        public String getName() {
            return name;
        }

        public String getNote() {
            return note;
        }
    }
}
