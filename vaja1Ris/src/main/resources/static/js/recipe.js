const recipeId = new URLSearchParams(window.location.search).get("id");
const updateForm = document.getElementById("updateForm");

if (!recipeId) {
    document.body.innerHTML = "<h2>Recipe not found!</h2>";
} else {
    // Load recipe on page load
    document.addEventListener("DOMContentLoaded", () => {
        loadRecipe();
    });
}

// Function to load recipe details
async function loadRecipe() {
    try {
        const response = await fetch(`/recipes/${recipeId}`);
        const recipe = await response.json();
        console.log(recipe);

        // Populate recipe details
        document.getElementById("recipe-image").src = recipe.imageUrl;
        document.getElementById("recipe-name").textContent = recipe.name;
        document.getElementById("recipe-duration").textContent = recipe.duration;
        document.getElementById("recipe-description").textContent = recipe.description;

        // Ingredients list
        const ingredientsContainer = document.getElementById("recipe-ingredients");
        ingredientsContainer.innerHTML = recipe.ingredients
            .split(",")
            .map(ing => `<li>${ing.trim()}</li>`)
            .join("");

        // Instructions list
        const instructionsContainer = document.getElementById("recipe-instructions");
        const steps = recipe.instructions.split(/(?:\d+\.\s)/).filter(s => s.trim() !== "");
        instructionsContainer.innerHTML = "<ol>" + steps.map(step => `<li>${step.trim()}</li>`).join("") + "</ol>";

        // Delete button
        document.getElementById("delete-btn").onclick = async () => {
            if (confirm("Are you sure you want to delete this recipe?")) {
                await fetch(`/recipes/${recipeId}`, { method: "DELETE" });
                alert("Recipe deleted!");
                window.location.href = "index.html";
            }
        };

        // Update button opens the form
        document.getElementById("edit-btn").onclick = () => {
            document.getElementById("name").value = recipe.name;
            document.getElementById("duration").value = recipe.duration;
            document.getElementById("image").value=recipe.imageUrl;
            document.getElementById("description").value = recipe.description;
            document.getElementById("ingredients").value = recipe.ingredients;
            document.getElementById("instructions").value = recipe.instructions;

            updateForm.style.display = "block";
        };

        // Close form
        document.getElementById("closeForm").onclick = () => {
            updateForm.style.display = "none";
        };

        // Form submit
        document.getElementById("recipeForm").onsubmit = async (e) => {
            e.preventDefault();

            const updatedRecipe = {
                name: document.getElementById("name").value,
                duration: document.getElementById("duration").value,
                imageUrl:document.getElementById("image").value,
                description: document.getElementById("description").value,
                ingredients: document.getElementById("ingredients").value,
                instructions: document.getElementById("instructions").value,
            };

            try {
                const res = await fetch(`/recipes/${recipeId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedRecipe)
                });

                if (res.ok) {
                    alert("Recipe updated successfully!");
                    updateForm.style.display = "none";
                    loadRecipe(); // reload recipe details
                } else {
                    alert("Failed to update recipe");
                }
            } catch (err) {
                console.error(err);
            }
        };

    } catch (error) {
        console.error("Error loading recipe:", error);
    }
}
