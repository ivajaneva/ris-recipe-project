package vaja1.ris.vaja1Ris.models;

import jakarta.persistence.*;
import vaja1.ris.vaja1Ris.dao.RecipesDao;

import java.util.List;


@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    String name;
    String description;

    private int duration; // minutes
    private String imageUrl;
    @Column(length = 1000)
    private String ingredients;
    @Column(length = 2000)
    private String instructions;
    private String category;
    public Recipe() {}

    public Recipe(String name, String description, int duration, String imageUrl, String ingredients,String instructions,String category) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.category = category;
    }
    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getDuration() {
        return duration;
    }

    public String getIngredients() {
        return ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}
