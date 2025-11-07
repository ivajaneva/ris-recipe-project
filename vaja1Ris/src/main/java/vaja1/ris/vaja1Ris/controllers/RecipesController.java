package vaja1.ris.vaja1Ris.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vaja1.ris.vaja1Ris.dao.RecipesDao;
import vaja1.ris.vaja1Ris.models.Recipe;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/recipes")
@CrossOrigin(origins ="*")
public class RecipesController {

    @Autowired
    private RecipesDao recipesDao;

    @GetMapping
    public List<Recipe> getRecipes(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return recipesDao.getAllByCategory(category);
        }
        return recipesDao.findAll();
    }


    @GetMapping("/{id}")
    public Optional<Recipe> getARecipes(@PathVariable Long id) {
        return recipesDao.findById(id);
    }

    @PostMapping
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        return recipesDao.save(recipe);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        Recipe existingRecipe = recipesDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id " + id));
        recipesDao.delete(existingRecipe);
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipeDetails) {
        Recipe existingRecipe = recipesDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id " + id));

        existingRecipe.setName(recipeDetails.getName());
        existingRecipe.setDescription(recipeDetails.getDescription());
        existingRecipe.setDuration(recipeDetails.getDuration());
        existingRecipe.setImageUrl(recipeDetails.getImageUrl());
        existingRecipe.setIngredients(recipeDetails.getIngredients());
        existingRecipe.setCategory(recipeDetails.getCategory());

        return recipesDao.save(existingRecipe);
    }
}

