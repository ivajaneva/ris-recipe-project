package vaja1.ris.vaja1Ris.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import vaja1.ris.vaja1Ris.models.IngredientAlternative;

import java.util.List;

public interface IngredientAlternativeDao extends JpaRepository<IngredientAlternative, Long> {
    List<IngredientAlternative> findByIngredient_Id(Long ingredientId);
    List<IngredientAlternative> findByIngredient_NameIgnoreCase(String ingredientName);
    boolean existsByIngredient_IdAndAlternative_Id(Long ingredientId, Long alternativeId);
    boolean existsByIngredient_NameIgnoreCaseAndAlternative_Id(String ingredientName, Long alternativeId);
}
