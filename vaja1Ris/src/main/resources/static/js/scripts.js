document.addEventListener("DOMContentLoaded", () => {
    loadRecipes(); // load recipes when the page loads
});

// Function to load all recipes
function loadRecipes() {
    const container = document.getElementById("recipes-container");
    container.innerHTML = ""; // clear existing recipes before reloading

    fetch("http://localhost:8083/recipes") // adjust port if needed
        .then(response => response.json())
        .then(recipes => {
            recipes.forEach(recipe => {
                const card = document.createElement("div");
                card.className = "recipe-card";

                card.innerHTML = `
                    <a href="recipe.html?id=${recipe.id}" class="recipe-link">
                    <img src="${recipe.imageUrl}" alt="${recipe.name}">
                    <h2>${recipe.name}</h2>
                    <p><strong>Duration:</strong> ${recipe.duration} minutes</p>
                    <p>${recipe.description}</p>
                    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                   </a>                
                    `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching recipes:", error));
}
const addRecipeBtn = document.getElementById("addRecipeBtn");
const formContainer = document.getElementById("recipeFormContainer");
const recipeForm = document.getElementById("recipeForm");
const cancelBtn = document.getElementById("cancelBtn");

// Show form when clicking "Add Recipe"
addRecipeBtn.addEventListener("click", () => {
    formContainer.style.display = "block";
});

// Hide form when clicking "Cancel"
cancelBtn.addEventListener("click", () => {
    formContainer.style.display = "none";
});

// Submit form
recipeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const recipeData = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        duration: parseInt(document.getElementById("duration").value),
        imageUrl: document.getElementById("imageUrl").value,
        ingredients: document.getElementById("ingredients").value,
    };

    const response = await fetch("http://localhost:8083/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
    });

    if (response.ok) {
        alert("Recipe added successfully!");
        formContainer.style.display = "none";
        recipeForm.reset();
        loadRecipes(); // reload list dynamically
    } else {
        alert("Error adding recipe.");
    }
});

