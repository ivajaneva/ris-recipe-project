package vaja1.ris.vaja1Ris.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredient_alternative")
public class IngredientAlternative {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    @ManyToOne(optional = false)
    @JoinColumn(name = "alternative_id")
    private Ingredient alternative;

    @Column(length = 255)
    private String note;

    public IngredientAlternative() {
    }

    public IngredientAlternative(Ingredient ingredient, Ingredient alternative, String note) {
        this.ingredient = ingredient;
        this.alternative = alternative;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public Ingredient getAlternative() {
        return alternative;
    }

    public String getNote() {
        return note;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public void setAlternative(Ingredient alternative) {
        this.alternative = alternative;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
