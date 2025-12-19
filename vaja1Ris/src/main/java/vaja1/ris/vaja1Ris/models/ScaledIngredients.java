package vaja1.ris.vaja1Ris.models;

import java.util.HashMap;
import java.util.Map;

public class ScaledIngredients {
    private Map<String, String> ingredients = new HashMap<>();
    public ScaledIngredients(Map<String, String> ingredients) {
        this.ingredients = ingredients;
    }
    public Map<String, String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Map<String, String> ingredients) {
        this.ingredients = ingredients;
    }
}
