import React, { useState } from "react";

function RecipeForm({ onSave, recipeToEdit }) {
    const [name, setName] = useState(recipeToEdit ? recipeToEdit.name : "");
    const [description, setDescription] = useState(recipeToEdit ? recipeToEdit.description : "");
    const [duration, setDuration] = useState(recipeToEdit ? recipeToEdit.duration : "");
    const [imageUrl, setImageUrl] = useState(recipeToEdit ? recipeToEdit.imageUrl : "");
    const [ingredients, setIngredients] = useState(recipeToEdit ? recipeToEdit.ingredients : "");
    const [instructions, setInstructions] = useState(recipeToEdit ? recipeToEdit.instructions : "");
    const [category, setCategory] = useState(recipeToEdit ? recipeToEdit.category:"");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeData = { name, description, duration, imageUrl, ingredients, instructions,category };
        const url = recipeToEdit ? `http://localhost:8083/recipes/${recipeToEdit.id}` : "http://localhost:8083/recipes";
        const method = recipeToEdit ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipeData),
        });

        if (res.ok) {
            alert(`Recipe ${recipeToEdit ? "updated" : "added"} successfully!`);
            onSave();
            if (!recipeToEdit) {
                setName(""); setDescription(""); setDuration(""); setImageUrl(""); setIngredients(""); setInstructions("");
            }
        } else {
           alert("Error saving recipe.");
        }
    };

    const handleCancel = () => {
        onSave();
    };

    return (
        <form id="recipeForm" onSubmit={handleSubmit}>
            <input type="text" placeholder="Recipe Name" value={name} onChange={e => setName(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
            <input type="number" placeholder="Duration (minutes)" value={duration} onChange={e => setDuration(e.target.value)} required />
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            <textarea placeholder="Ingredients (separate with commas)" value={ingredients} onChange={e => setIngredients(e.target.value)} rows="3" />
            <textarea placeholder="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} rows="4" /> 
            <label>Category:</label>
             <select value={category} onChange={e => setCategory(e.target.value)}>
             <option value="">Select a category</option>
             <option value="Sweets">Sweets</option>
             <option value="Salads">Salads</option>
             <option value="Meat">Meat</option>
             <option value="Pasta">Pasta</option>
             <option value="Soup">Soup</option>
             </select>
                <div className="form-buttons">
                <button type="submit" className="submit-btn">{recipeToEdit ? "Update" : "Add"} Recipe</button>
                <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
        </form>
    );
}

export default RecipeForm;