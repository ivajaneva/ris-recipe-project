import React from "react";
import { Link } from "react-router-dom";

function RecipeItem({ recipe }) {
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <img src={recipe.imageUrl || "/placeholder-image.jpg"} alt={recipe.name} />
                <h2>{recipe.name}</h2>
                <p className="duration"><strong>Duration:</strong> {recipe.duration} minutes</p>
                <p className="description">{truncateText(recipe.description, 100)}</p>
                <p className="ingredients-preview"><strong>Ingredients:</strong> {truncateText(recipe.ingredients, 80)}</p>
                <p className="category"><strong>Category:</strong>{truncateText(recipe.category||"No category")}</p>
            </Link>
        </div>
    );
}

export default RecipeItem;