package vaja1.ris.vaja1Ris.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import vaja1.ris.vaja1Ris.models.Recipe;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface RecipesDao extends JpaRepository<Recipe, Long> {
    List<Recipe> getAllByCategory(String category);
    List<Recipe> findByLabel(String label);
    // New method to filter by both category AND label
    @Query("SELECT r FROM Recipe r WHERE r.category = :category AND r.label = :label")
    List<Recipe> getAllByCategoryAndLabel(@Param("category") String category, @Param("label") String label);

}
