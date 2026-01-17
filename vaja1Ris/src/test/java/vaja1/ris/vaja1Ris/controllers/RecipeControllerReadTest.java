package vaja1.ris.vaja1Ris.controllers;


import vaja1.ris.vaja1Ris.dao.RecipesDao;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import vaja1.ris.vaja1Ris.models.Recipe;
import java.util.List;
import java.util.Collections;


import java.util.Optional;

/**
 * Unit tests for read operations in RecipesController.
 * The DAO is mocked to isolate controller logic.
 */
@ExtendWith(MockitoExtension.class)
public class RecipeControllerReadTest {
    /**
     * dao is mocked and the recipeController is at tets
     */
    @Mock
    private RecipesDao recipeDao;
    @InjectMocks
    private RecipesController recipesController;

    @BeforeEach
    void setup() {
    }
    /**
     * Positive test case:
     * Verifies that requesting an existing recipe by ID
     * returns the correct recipe data.
     */
    @Test
    void getRecipeById_existingId_returnsRecipe() {
        // Arrange – prepare test data
        Long id = 1L;
        Recipe recipe = new Recipe(
                "Pasta Bolognese",
                "Traditional Italian pasta",
                30,
                null,
                "pasta, tomato, meat",
                "Cook pasta and sauce",
                "pasta"
        );
        Mockito.when(recipeDao.findById(id))
                .thenReturn(Optional.of(recipe));


        // Act – call the method we are testing
        Optional<Recipe> result = recipesController.getARecipes(id);

        Assertions.assertTrue(result.isPresent());
        Recipe returnedRecipe = result.get();

        // Assert – check the result
        Assertions.assertEquals("Pasta Bolognese", returnedRecipe.getName());
        Assertions.assertEquals(30, returnedRecipe.getDuration());
        Assertions.assertEquals("pasta", returnedRecipe.getCategory()); }

    /**
     * Negative test case:
     * Verifies that requesting recipes by a category
     * for which no recipes exist returns an empty list.
     */
    @Test
    void getRecipesByCategory_nonExistingCategory_returnsEmptyList() {
        // Arrange mock dao to return no results
        String category = "dessert";

        Mockito.when(recipeDao. getAllByCategory(category))
                .thenReturn(Collections.emptyList());

        // call the controller
        List<Recipe> result = recipesController.getRecipes(category, null);
        // Assert verify the empty result
        Assertions.assertNotNull(result);
        Assertions.assertTrue(result.isEmpty());
    }

}
