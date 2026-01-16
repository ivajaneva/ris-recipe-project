import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeItem from "./RecipeItem";
import { getFavorites } from "../utils/favorites";

function Favorites() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        // Guard: redirect to login if not logged in
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchFavoriteRecipes = async () => {
            try {
                const favorites = getFavorites(user.id);
                
                if (favorites.length === 0) {
                    setRecipes([]);
                    setLoading(false);
                    return;
                }

                // Fetch all recipes and filter by favorites
                const response = await fetch('http://localhost:8083/recipes');
                const allRecipes = await response.json();
                const favoriteRecipes = allRecipes.filter(recipe => favorites.includes(recipe.id));
                setRecipes(favoriteRecipes);
            } catch (error) {
                console.error("Error fetching favorite recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteRecipes();
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        window.location.reload();
    };

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div>
            {/* Modern Navbar */}
            <nav className="navbar">
                <div className="navbar-content">
                    <h2>CookBook+ 🍲</h2>
                    <div className="navbar-user-info">
                        <button className="btn btn-outline btn-sm" onClick={() => navigate('/')}>
                            ← All Recipes
                        </button>
                        <span>Welcome, <strong>{user.username}</strong></span>
                        <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container">
                {/* Page Header */}
                <div className="page-header">
                    <h1>My Favorite Recipes</h1>
                    <p>Your collection of saved recipes</p>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="loading">Loading favorites...</div>
                ) : recipes.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        background: 'var(--bg-white)',
                        borderRadius: 'var(--border-radius)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❤️</div>
                        <h2 style={{ 
                            fontSize: '1.75rem', 
                            fontWeight: 700, 
                            color: 'var(--text-primary)',
                            marginBottom: '0.5rem'
                        }}>
                            No favorites yet
                        </h2>
                        <p style={{ 
                            color: 'var(--text-secondary)',
                            fontSize: '1.125rem',
                            marginBottom: '2rem'
                        }}>
                            Start adding recipes to your favorites collection!
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('/')}>
                            Browse Recipes
                        </button>
                    </div>
                ) : (
                    <div id="recipes-container">
                        {recipes.map(r => <RecipeItem key={r.id} recipe={r} />)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;

