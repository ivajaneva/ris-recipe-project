// RecipeItem.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function RecipeItem({ recipe }) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [favorite, setFavorite] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    useEffect(() => {
        if (user) {
            setFavorite(isFavorite(user.id, recipe.id));
        }
    }, [user, recipe.id]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    const handleHeartClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user || isToggling) return;

        setIsToggling(true);
        try {
            const newFavoriteState = await toggleFavorite(user.id, recipe.id, favorite);
            setFavorite(newFavoriteState);
        } catch (error) {
            alert("Error updating favorite. Please try again.");
        } finally {
            setIsToggling(false);
        }
    };

    return (
        <div className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <div className="recipe-card-image-wrapper">
                    <img src={recipe.imageUrl || "/placeholder-image.jpg"} alt={recipe.name} />
                    {user && (
                        <button
                            className="favorite-btn"
                            onClick={handleHeartClick}
                            disabled={isToggling}
                            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            {favorite ? '❤️' : '🤍'}
                        </button>
                    )}
                </div>
                <div className="recipe-card-content">
                    <h2>{recipe.name}</h2>

                    <div className="recipe-card-meta">
                        <span className="recipe-card-meta-item">
                            ⏱️ {recipe.duration} min
                        </span>
                    </div>

                    <p className="description">{truncateText(recipe.description, 120)}</p>

                    {recipe.category && (
                        <span className="recipe-card-category">{recipe.category}</span>
                    )}

                    {/* Blue Label Badge */}
                    {recipe.label && (
                        <span className={`recipe-label ${recipe.label.toLowerCase()}`}>
                            {recipe.label}
                        </span>
                    )}
                </div>
            </Link>
        </div>
    );
}

export default RecipeItem;
