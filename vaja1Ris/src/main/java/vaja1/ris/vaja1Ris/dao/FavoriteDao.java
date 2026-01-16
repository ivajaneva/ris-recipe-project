package vaja1.ris.vaja1Ris.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vaja1.ris.vaja1Ris.models.Favorite;

import java.util.List;

public interface FavoriteDao extends JpaRepository<Favorite, Long> {

    @Query("SELECT f.recipeId FROM Favorite f WHERE f.userId = :userId")
    List<Long> findRecipeIdsByUserId(@Param("userId") Long userId);

    boolean existsByUserIdAndRecipeId(Long userId, Long recipeId);

    void deleteByUserIdAndRecipeId(Long userId, Long recipeId);
}

