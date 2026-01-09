package vaja1.ris.vaja1Ris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vaja1.ris.vaja1Ris.dao.IngredientDao;
import vaja1.ris.vaja1Ris.dao.RecipesDao;
import vaja1.ris.vaja1Ris.models.Ingredient;
import vaja1.ris.vaja1Ris.models.Recipe;

import java.util.*;

@CrossOrigin(origins ="*")
@RestController
@RequestMapping("/ingredients")

public class IngredientController {

    @Autowired
    private IngredientDao ingredientDao;

    @Autowired
    private RecipesDao recipesDao;

    /**
     * TEST endpoint – vrne vse sestavine iz baze
     */
    @GetMapping
    public List<Ingredient> getAllIngredients() {
        return ingredientDao.findAll();
    }

    /**
     * GLAVNI endpoint:
     * Za izbran recept vrne hranilne vrednosti po sestavinah,
     * s skaliranjem glede na število porcij in enote iz baze.
     */
    @GetMapping("/recipe/{recipeId}/nutrition")
    public Map<String, Object> getNutritionForRecipe(
            @PathVariable Long recipeId,
            @RequestParam(defaultValue = "1") int portions // default 1 portion
    ) {

        Recipe recipe = recipesDao.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        List<IngredientQuantity> ingredientQuantities = extractIngredientQuantities(recipe.getIngredients());

        double totalCalories = 0;
        double totalProtein = 0;
        double totalCarbs = 0;
        double totalFat = 0;

        List<Map<String, Object>> ingredientDetails = new ArrayList<>();

        for (IngredientQuantity iq : ingredientQuantities) {
            Optional<Ingredient> optionalIngredient =
                    ingredientDao.findByNameIgnoreCase(iq.getName());

            if (optionalIngredient.isPresent()) {
                Ingredient ingredient = optionalIngredient.get();

                // scale by amount in recipe, per unit in DB, and portions
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
                ingredientInfo.put("name", ingredient.getName());
                ingredientInfo.put("calories", calories);
                ingredientInfo.put("protein", protein);
                ingredientInfo.put("carbs", carbs);
                ingredientInfo.put("fat", fat);

                ingredientDetails.add(ingredientInfo);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("recipeName", recipe.getName());
        response.put("ingredients", ingredientDetails);
        response.put("totalCalories", totalCalories);
        response.put("totalProtein", totalProtein);
        response.put("totalCarbs", totalCarbs);
        response.put("totalFat", totalFat);
        response.put("dailyCalories", 2000.0); // for percentage
        response.put("percentageOfDaily", totalCalories / 2000.0 * 100);

        return response;
    }

    /**
     * Pretvori enoto iz baze v numeric value za izračun faktorja
     */
    private double getUnitAmount(String unit) {
        return switch (unit) {
            case "piece", "1 crust" -> 1.0;
            case "100g", "100ml" -> 100.0;
            case "10g" -> 10.0;
            default -> 1.0; // fallback
        };
    }

    /**
     * Iz stringa recepta potegnemo ime, količino in enoto
     * Primer: "200g flour, 2 eggs, 250ml milk"
     */
    private List<IngredientQuantity> extractIngredientQuantities(String ingredientsText) {
        if (ingredientsText == null || ingredientsText.isEmpty()) {
            return List.of();
        }

        List<IngredientQuantity> list = new ArrayList<>();
        String[] parts = ingredientsText.split(",");

        for (String part : parts) {
            part = part.trim();

            // Extract numeric amount
            String amountStr = part.replaceAll("[^0-9.]", "");
            String unitStr = part.replaceAll("[0-9.\\s]", "").split(" ")[0]; // optional: g, ml, piece
            String name = part.replaceAll("[0-9.]+\\s*(g|ml|kg|tbsp|tsp|piece)?", "")
                    .replaceAll("\\b(for frying)\\b", "")
                    .trim()
                    .toLowerCase();

            double amount = 0;
            try {
                amount = Double.parseDouble(amountStr);
            } catch (NumberFormatException ignored) {}

            list.add(new IngredientQuantity(name, amount, unitStr));
        }

        return list;
    }

    /**
     * Helper class za hranjenje ime + količina + enota
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
}
