import React, { useState, useEffect } from "react";
import RecipeItem from "./RecipeItem";
import RecipeForm from "./RecipeForm";
import Filter from "./Filter"; 

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [showForm, setShowForm] = useState(false);

   
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

    return (
        <div>
            <h1>All Recipes</h1>

            {/*button tuka */}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add New Recipe"}
            </button>

            {showForm && (
                <div className="recipe-form show">
                    <RecipeForm onSave={handleSave} />
                </div>
            )}

            {/* filter tuka*/}
            <Filter onFilter={fetchRecipes} />

            {/*list of recepi tuka*/}
            <div id="recipes-container">
                {recipes.length === 0 ? (
                    <p>No recipes found in this category.</p>
                ) : (
                    recipes.map(r => <RecipeItem key={r.id} recipe={r} />)
                )}
            </div>
        </div>
    );
}

export default RecipeList;
