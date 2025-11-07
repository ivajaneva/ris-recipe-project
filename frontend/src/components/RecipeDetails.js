import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8083/recipes/${id}`)
            .then(res => res.json())
            .then(data => setRecipe(data))
            .catch(err => console.error(err));
    }, [id]);

    const deleteRecipe = async () => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            await fetch(`http://localhost:8083/recipes/${id}`, { method: "DELETE" });
            alert("Recipe deleted!");
            navigate("/");
        }
    };

    const handleSave = () => {
        setEditing(false);
        fetch(`http://localhost:8083/recipes/${id}`)
            .then(res => res.json())
            .then(data => setRecipe(data));
    };

    if (!recipe) return <div className="loading">Loading...</div>;

    return (
        <div className="recipe-details">
            {editing ? (
                <div className="edit-form-container">
                    <h2>Edit Recipe</h2>
                    <RecipeForm recipeToEdit={recipe} onSave={handleSave} />
                </div>
            ) : (
                <>
                    <button className="back-button" onClick={() => navigate("/")}>← Back to Recipes</button>

                    <div className="recipe-header">
                        <img src={recipe.imageUrl || "/placeholder-image.jpg"} alt={recipe.name} className="recipe-detail-image" />
                        <div className="recipe-info">
                            <h1>{recipe.name}</h1>
                            <p className="recipe-meta"><strong>Duration:</strong> {recipe.duration} minutes</p>
                            <p className="recipe-description">{recipe.description}</p>
                            <p className="recipe-category"><strong>Category:</strong> {recipe.category || "No category"}</p>
                        </div>
                    </div>

                    <div className="recipe-content">
                        <div className="ingredients-section">
                            <h2>Ingredients</h2>
                            <ul className="ingredients-list">
                                {recipe.ingredients.split(',').map((ingredient, index) => (
                                    <li key={index}>{ingredient.trim()}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="instructions-section">
                            <h2>Instructions</h2>
                            <ol className="instructions-list">
                                {recipe.instructions.split('\n').map((step, index) => (
                                    <li key={index}>{step.trim()}</li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="edit-btn" onClick={() => setEditing(true)}>Edit Recipe</button>
                        <button className="delete-btn" onClick={deleteRecipe}>Delete Recipe</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default RecipeDetails;
