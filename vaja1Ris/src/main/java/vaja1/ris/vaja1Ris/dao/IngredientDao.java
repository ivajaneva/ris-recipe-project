package vaja1.ris.vaja1Ris.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vaja1.ris.vaja1Ris.models.Ingredient;

import java.util.Optional;

public interface IngredientDao extends JpaRepository<Ingredient, Long> {
    Optional<Ingredient> findByNameIgnoreCase(String name);
}
