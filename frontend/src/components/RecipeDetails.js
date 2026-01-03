import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [editing, setEditing] = useState(false);
    const [portions, setPortions] = useState(1);

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

    const downloadRecipePdf = () => {
        window.location.href = `http://localhost:8083/recipes/${id}/export/pdf`;
    };

    const printRecipePdf = () => {
        window.open(`http://localhost:8083/recipes/${id}/print/pdf`, "_blank");
    };

    const parseIngredient = (text) => {
        const t = text.trim();

        const match = t.match(/^(\d+(?:[.,]\d+)?)(\s*[a-zA-ZčćžšđČĆŽŠĐ]+)?\s*(.*)$/);
        if (!match)
            return null;

        const rawNum = match[1];
        const unit = (match[2] || "").trim();
        const rest = (match[3] || "").trim();

        const num = Number(rawNum.replace(",", "."));
        if (Number.isNaN(num))
            return null;

        return {num, unit, rest};
    };

    const formatNumber = (n) => {
        return Number.isInteger(n) ? String(n) : String(Math.round(n*100)/100);
    };

    const scaledIngredients = useMemo(() => {
        if (!recipe?.ingredients) return [];

        const list = recipe.ingredients.split(",").map((x) => x.trim()).filter(Boolean);

        return list.map((ingredient) => {
            const parsed = parseIngredient(ingredient);

            // if ingredient doesn't start with a number -> leave as is
            if (!parsed) return ingredient;

            const scaled = parsed.num * portions;
            const prefix = `${formatNumber(scaled)}${parsed.unit ? " " + parsed.unit : ""}`;

            return parsed.rest ? `${prefix} ${parsed.rest}` : prefix;
        });
    }, [recipe, portions]);


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

                            <div style={{ marginTop: 12 }}>
                                <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                                    Portions:
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={portions}
                                    onChange={(e) => {
                                        // allow empty while typing, but clamp to >= 1
                                        const val = e.target.value;
                                        if (val === "") {
                                            setPortions(1);
                                            return;
                                        }
                                        const n = parseInt(val, 10);
                                        setPortions(Number.isFinite(n) && n > 0 ? n : 1);
                                    }}
                                    onBlur={() => {
                                        // extra safety
                                        if (!Number.isFinite(portions) || portions < 1) setPortions(1);
                                    }}
                                    style={{ width: 90, padding: "6px 8px" }}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="recipe-content">
                        <div className="ingredients-section">
                            <h2>Ingredients</h2>
                            <ul className="ingredients-list">
                                {scaledIngredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
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
                        <button className="preview-pdf-btn" onClick={printRecipePdf}>Preview PDF</button>
                        <button className="download-pdf-btn" onClick={downloadRecipePdf}>Download PDF</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default RecipeDetails;
