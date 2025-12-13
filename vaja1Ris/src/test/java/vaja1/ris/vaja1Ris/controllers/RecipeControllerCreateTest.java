package vaja1.ris.vaja1Ris.controllers;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import vaja1.ris.vaja1Ris.dao.RecipesDao;
import vaja1.ris.vaja1Ris.models.Recipe;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecipeControllerCreateTest {

    @Mock
    private RecipesDao recipesDao;

    @InjectMocks
    private RecipesController recipesController;

    private Recipe validRecipe;

    @BeforeEach
    void setup() {
        validRecipe = new Recipe();
        validRecipe.setName("Buckwheat Mushroom Pilaf");
        validRecipe.setCategory("Traditional Cuisine");
        validRecipe.setDuration(35);
        validRecipe.setDescription("A hearty buckwheat dish with sautéed mushrooms.");
        validRecipe.setIngredients("buckwheat, mushrooms, onion, garlic, olive oil, salt, pepper");
        validRecipe.setInstructions(
                "Rinse the buckwheat thoroughly. Sauté onion and mushrooms, add buckwheat, "
                        + "pour in water or broth, and simmer until tender."
        );
        validRecipe.setImageUrl("http://example.com/buckwheat-pilaf.png");
    }

    @Test
    @DisplayName("addRecipe_validData_success: valid recipe is saved and returned")
    void addRecipe_validData_success() {

        when(recipesDao.save(any(Recipe.class))).thenAnswer(inv -> inv.getArgument(0));


        Recipe saved = recipesController.addRecipe(validRecipe);


        assertNotNull(saved, "Saved recipe must not be null");
        assertEquals("Buckwheat Mushroom Pilaf", saved.getName());
        assertEquals("Traditional Cuisine", saved.getCategory());
        assertEquals(35, saved.getDuration());
        assertNotNull(saved.getInstructions(), "Instructions should be present for a realistic recipe");

        verify(recipesDao, times(1)).save(validRecipe);
    }

    @Test
    @DisplayName("addRecipe_invalidDuration_returns400: duration < 1 throws BAD_REQUEST")
    void addRecipe_invalidDuration_returns400() {

        Recipe invalid = new Recipe();
        invalid.setName("Chickpea Flour Flatbread");
        invalid.setCategory("Mediterranean Cuisine");
        invalid.setDuration(0); // invalid duration
        invalid.setDescription("A simple flatbread made from chickpea flour.");
        invalid.setIngredients("chickpea flour, water, olive oil, salt, rosemary");
        invalid.setInstructions(
                "Mix chickpea flour with water and salt, rest the batter, then bake in a hot pan "
                        + "until golden on both sides."
        );
        invalid.setImageUrl("http://example.com/chickpea-flatbread.png");


        ResponseStatusException ex = assertThrows(
                ResponseStatusException.class,
                () -> recipesController.addRecipe(invalid)
        );

        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
        assertNotNull(ex.getReason());
        assertTrue(ex.getReason().toLowerCase().contains("duration"));


        verify(recipesDao, never()).save(any());
    }
}
