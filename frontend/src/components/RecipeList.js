import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeItem from "./RecipeItem";
import RecipeForm from "./RecipeForm";
import Filter from "./Filter"; 

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("currentUser"));
   
    const fetchRecipes = (category = "") => {
        let url = "http://localhost:8083/recipes";
        if (category) {
            url += `?category=${category}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setRecipes(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchRecipes(); 
    }, []);

    const handleSave = () => {
        fetchRecipes();
        setShowForm(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser"); // Briše sesiju
        window.location.reload(); // Osvežava stranicu da se ažurira UI
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* --- NAVBAR SEKCIJA --- */}
            <nav style={styles.navbar}>
                <h2 style={{ margin: 0 }}>CookBook+ 🍲</h2>
                <div>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span>Logged in as: <strong>{user.username}</strong></span>
                            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} style={styles.loginBtn}>Login</button>
                    )}
                </div>
            </nav>
            <hr />

            {/* --- OSTATAK TVOG KODA --- */}
            <h1>All Recipes</h1>

            <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
                {showForm ? "Cancel" : "Add New Recipe"}
            </button>

            {showForm && (
                <div className="recipe-form show">
                    <RecipeForm onSave={() => { fetchRecipes(); setShowForm(false); }} />
                </div>
            )}

            <Filter onFilter={fetchRecipes} />

            <div id="recipes-container" style={{ marginTop: '20px' }}>
                {recipes.length === 0 ? (
                    <p>No recipes found in this category.</p>
                ) : (
                    recipes.map(r => <RecipeItem key={r.id} recipe={r} />)
                )}
            </div>
        </div>
    );
}

// Inline stilovi
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    logoutBtn: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' },
    loginBtn: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' },
    addBtn: { padding: '10px 20px', marginBottom: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }
};

export default RecipeList;
