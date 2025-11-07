package vaja1.ris.vaja1Ris.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import vaja1.ris.vaja1Ris.models.Recipe;

import java.util.List;

@Repository
public interface RecipesDao extends JpaRepository<Recipe, Long> {
    List<Recipe> getAllByCategory(String category);
}
