import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeItem from "./RecipeItem";
import RecipeForm from "./RecipeForm";
import Filter from "./Filter";
import { getFavorites } from "../utils/favorites";

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const [categoryFilter, setCategoryFilter] = useState(""); // current category
    const [labelFilter, setLabelFilter] = useState("");       // current label

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("currentUser"));

    // Fetch recipes based on current filters + favorites
    const fetchRecipes = (category = categoryFilter, label = labelFilter) => {
        let url = "http://localhost:8083/recipes";
        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (label) params.append("label", label);

        if (params.toString()) url += `?${params.toString()}`;

        console.log("Fetching recipes with URL:", url); // debug

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (showFavoritesOnly && user) {
                    const favorites = getFavorites(user.id);
                    data = data.filter(recipe => favorites.includes(recipe.id));
                }
                setRecipes(data);
            })
            .catch(err => console.error(err));
    };

    // On mount or filter/favorites change, fetch recipes
    useEffect(() => {
        fetchRecipes(categoryFilter, labelFilter);
    }, [showFavoritesOnly, categoryFilter, labelFilter]); // <- triggers when favorites toggle or filters change

    const handleSave = () => {
        fetchRecipes();
        setShowForm(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        window.location.reload();
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-content">
                    <h2>CookBook+ 🍲</h2>
                    <div className="navbar-user-info">
                        {user ? (
                            <>
                                <span>Welcome, <strong>{user.username}</strong></span>
                                <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>Login</button>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container">
                <div className="page-header">
                    <h1>{showFavoritesOnly ? "My Favorite Recipes" : "All Recipes"}</h1>
                    <p>Discover delicious recipes for every occasion</p>
                </div>

                <div className="action-buttons-bar">
                    <button className={`btn ${showForm ? 'btn-outline' : 'btn-primary'}`} onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Cancel" : "+ Add New Recipe"}
                    </button>

                    {user && (
                        <>
                            <button
                                className={`btn ${showFavoritesOnly ? 'btn-danger' : 'btn-success'}`}
                                onClick={() => setShowFavoritesOnly(prev => !prev)}
                            >
                                {showFavoritesOnly ? "Show All" : "❤️ Show Favorites"}
                            </button>
                            <button className="btn btn-outline" onClick={() => navigate('/favorites')}>View Favorites Page</button>
                        </>
                    )}
                </div>

                {showForm && (
                    <div className="recipe-form show">
                        <RecipeForm onSave={handleSave} />
                    </div>
                )}

                {/* Pass filter state setters to Filter */}
                <Filter
                    onFilter={(category, label) => {
                        setCategoryFilter(category);
                        setLabelFilter(label);
                    }}
                />

                <div id="recipes-container">
                    {recipes.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                            <p>No recipes found. {user && !showFavoritesOnly && "Try adding a new recipe!"}</p>
                        </div>
                    ) : (
                        recipes.map(r => <RecipeItem key={r.id} recipe={r} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecipeList;
