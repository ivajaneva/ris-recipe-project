package vaja1.ris.vaja1Ris.models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
/**
 * Unit test for the recipe model class
 * we are checking rules related to creation of recipe duration
 */
public class RecipeTest {
/**
 * Here we have the positive scenario test
 * we are testing values for which the recipe should be successfully saved
 * */
    @ParameterizedTest
    @ValueSource(ints = { 1, 5, 30, 120 , 1440})
    void constructor_validDuration_createsRecipe(int duration) {
        Recipe recipe = new Recipe(
                "Test Recipe",
                "Test description",
                duration,
                null,
                "ingredients",
                "instructions",
                "test"
        );

        Assertions.assertEquals(duration, recipe.getDuration());
    }
    /**
     * Here we have the negative scenario test
     * we are testing values for which the recipe should throw error like 0
     * like negative values or too large
     * */
    @ParameterizedTest
    @ValueSource(ints = { 0, -1, -10, 1441, 10000 })
    void constructor_invalidDuration_throwsException(int duration) {
        Assertions.assertThrows(IllegalArgumentException.class, () ->
                new Recipe(
                        "Test Recipe",
                        "Test description",
                        duration,
                        null,
                        "ingredients",
                        "instructions",
                        "test"
                )
        );
    }

}
