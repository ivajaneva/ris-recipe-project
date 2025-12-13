package vaja1.ris.vaja1Ris.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import vaja1.ris.vaja1Ris.dao.RecipesDao;
import vaja1.ris.vaja1Ris.models.Recipe;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RecipesController.class)
@AutoConfigureMockMvc(addFilters = false) // harmless if you have no security; helpful if you do
class RecipesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RecipesDao recipesDao;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void updateRecipe_existingRecipe_updatesSuccessfully() throws Exception {
        Long id = 1L;

        // existing recipe in DB
        Recipe existing = new Recipe();
        existing.setId(id);
        existing.setName("Old name");
        existing.setDescription("Old description");
        existing.setDuration(10);
        existing.setImageUrl("http://old.image");
        existing.setIngredients("Old ingredients");
        existing.setInstructions("Old instructions");
        existing.setCategory("Old category");

        // new values sent from client
        Recipe incoming = new Recipe();
        incoming.setName("New name");
        incoming.setDescription("New description");
        incoming.setDuration(45); // changed
        incoming.setImageUrl("http://new.image");
        incoming.setIngredients("New ingredients");
        incoming.setInstructions("New instructions");
        incoming.setCategory("Dinner"); // changed

        when(recipesDao.findById(id)).thenReturn(Optional.of(existing));
        // controller saves the mutated existingRecipe; return it (or echo arg)
        when(recipesDao.save(any(Recipe.class))).thenAnswer(inv -> inv.getArgument(0));

        mockMvc.perform(
                        put("/recipes/{id}", id)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(incoming))
                )
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.duration").value(45))
                .andExpect(jsonPath("$.category").value("Dinner"))
                .andExpect(jsonPath("$.name").value("New name"));

        // Verify save called and values truly updated before saving
        ArgumentCaptor<Recipe> captor = ArgumentCaptor.forClass(Recipe.class);
        verify(recipesDao).save(captor.capture());

        Recipe saved = captor.getValue();
        assertThat(saved.getId()).isEqualTo(id);
        assertThat(saved.getDuration()).isEqualTo(45);
        assertThat(saved.getCategory()).isEqualTo("Dinner");
        assertThat(saved.getName()).isEqualTo("New name");
    }
}
