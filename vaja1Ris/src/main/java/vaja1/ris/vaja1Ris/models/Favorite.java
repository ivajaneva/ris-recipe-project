package vaja1.ris.vaja1Ris.models;

import jakarta.persistence.*;

@Entity
@Table(name = "favorites", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "recipe_id"})
})
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "recipe_id", nullable = false)
    private Long recipeId;

    // PRAZAN konstruktor obavezan za JPA
    public Favorite() {}

    public Favorite(Long userId, Long recipeId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }
        if (recipeId == null) {
            throw new IllegalArgumentException("Recipe ID must not be null");
        }
        this.userId = userId;
        this.recipeId = recipeId;
    }

    // GETTERI / SETTERI
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }
}

