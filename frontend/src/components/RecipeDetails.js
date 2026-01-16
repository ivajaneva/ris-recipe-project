import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import { isFavorite, toggleFavorite } from "../utils/favorites";

const AMOUNT_FACTORS = [0.25, 0.5, 1, 1.5, 2, 3, 4, 5];
const AMOUNT_PATTERN = /^(\d+(?:[.,]\d+)?(?:\s+\d+\/\d+)?|\d+\/\d+)/;
const UNIT_TOKENS = [
    "g",
    "kg",
    "ml",
    "l",
    "tbsp",
    "tsp",
    "teaspoon",
    "tablespoon",
    "cup",
    "cups",
    "piece",
    "pieces",
    "clove",
    "cloves",
];

const formatNumber = (n) => Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100);

const normalizeName = (name) => {
    if (!name) return "";
    return name
        .toLowerCase()
        .replace(/\([^)]*\)/g, "")
        .replace(/for frying/g, "")
        .replace(/\s+/g, " ")
        .trim();
};

const singularizeToken = (token) => {
    if (token.endsWith("ies") && token.length > 3) {
        return token.slice(0, -3) + "y";
    }
    if (token.endsWith("es") && token.length > 2) {
        return token.slice(0, -2);
    }
    if (token.endsWith("s") && token.length > 1) {
        return token.slice(0, -1);
    }
    return token;
};

const singularizeName = (name) => {
    const parts = name.split(" ");
    if (parts.length === 0) return name;
    parts[parts.length - 1] = singularizeToken(parts[parts.length - 1]);
    return parts.join(" ").trim();
};

const parseAmount = (token) => {
    if (!token) return 0;
    const normalized = token.trim().replace(",", ".");
    const parts = normalized.split(/\s+/);
    let total = 0;
    for (const part of parts) {
        if (part.includes("/")) {
            const [num, den] = part.split("/");
            const numerator = parseFloat(num);
            const denominator = parseFloat(den);
            if (Number.isFinite(numerator) && Number.isFinite(denominator) && denominator !== 0) {
                total += numerator / denominator;
            }
        } else {
            const value = parseFloat(part);
            if (Number.isFinite(value)) {
                total += value;
            }
        }
    }
    return total;
};

const parseIngredientLine = (line) => {
    const trimmed = (line || "").trim();
    if (!trimmed) return null;

    let amount = 0;
    let remainder = trimmed;
    const match = trimmed.match(AMOUNT_PATTERN);
    if (match) {
        amount = parseAmount(match[1]);
        remainder = trimmed.slice(match[0].length).trim();
    }

    let unit = "";
    if (remainder) {
        const tokens = remainder.split(/\s+/, 2);
        const possibleUnit = tokens[0].toLowerCase();
        if (UNIT_TOKENS.includes(possibleUnit)) {
            unit = tokens[0];
            remainder = tokens[1] ? tokens[1].trim() : "";
        }
    }

    return {
        amount,
        unit,
        name: remainder,
    };
};

const getUnitInfo = (unit) => {
    const raw = (unit || "").trim().toLowerCase();
    if (!raw) {
        return { baseAmount: 1, unitLabel: "", unitToken: "" };
    }
    if (raw === "piece" || raw === "pieces") {
        return { baseAmount: 1, unitLabel: "piece", unitToken: "" };
    }
    if (raw === "1 crust") {
        return { baseAmount: 1, unitLabel: "crust", unitToken: "" };
    }

    const match = raw.match(/^(\d+(?:[.,]\d+)?)\s*([a-zA-Z]+)$/);
    if (match) {
        const baseAmount = parseFloat(match[1].replace(",", "."));
        const unitLabel = match[2];
        return { baseAmount: Number.isFinite(baseAmount) ? baseAmount : 1, unitLabel, unitToken: unitLabel };
    }

    return { baseAmount: 1, unitLabel: raw, unitToken: raw };
};

const findIngredientByName = (name, catalog) => {
    const normalized = normalizeName(name);
    if (!normalized) return null;
    let match = catalog.find((item) => normalizeName(item.name) === normalized);
    if (match) return match;
    const singular = singularizeName(normalized);
    if (singular !== normalized) {
        match = catalog.find((item) => normalizeName(item.name) === singular);
    }
    return match || null;
};

const buildIngredientEdits = (ingredientsText, catalog) => {
    if (!ingredientsText) return [];
    const parts = ingredientsText.split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
    return parts.map((part) => {
        const parsed = parseIngredientLine(part);
        const ingredient = parsed ? findIngredientByName(parsed.name, catalog) : null;
        const ingredientId = ingredient ? ingredient.id : (catalog[0] ? catalog[0].id : null);
        let factor = 1;
        if (ingredient && parsed && parsed.amount > 0) {
            const { baseAmount } = getUnitInfo(ingredient.unit);
            const rawFactor = parsed.amount / baseAmount;
            factor = Number.isFinite(rawFactor) && rawFactor > 0
                ? Math.round(rawFactor * 100) / 100
                : 1;
        }
        return { ingredientId, factor };
    });
};

const buildAmountOptions = (ingredient, currentFactor) => {
    if (!ingredient) return [];
    const { baseAmount, unitLabel } = getUnitInfo(ingredient.unit);
    const factors = [...AMOUNT_FACTORS];
    if (Number.isFinite(currentFactor) && currentFactor > 0) {
        const hasFactor = factors.some((factor) => Math.abs(factor - currentFactor) < 0.001);
        if (!hasFactor) {
            factors.push(currentFactor);
        }
    }
    factors.sort((a, b) => a - b);
    return factors.map((factor) => {
        const amount = baseAmount * factor;
        const amountLabel = `${formatNumber(amount)}${unitLabel ? " " + unitLabel : ""}`;
        return {
            factor,
            label: `${amountLabel} (${formatNumber(factor)}x)`,
        };
    });
};

const buildIngredientsString = (edits, catalog) => {
    return edits
        .map((edit) => {
            const ingredient = catalog.find((item) => item.id === edit.ingredientId);
            if (!ingredient) return "";
            const { baseAmount, unitToken } = getUnitInfo(ingredient.unit);
            const factor = edit.factor || 1;
            const amount = baseAmount * factor;
            const amountText = formatNumber(amount);
            const amountWithUnit = unitToken ? `${amountText} ${unitToken}` : amountText;
            return `${amountWithUnit} ${ingredient.name}`.trim();
        })
        .filter(Boolean)
        .join(", ");
};

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [nutrition, setNutrition] = useState(null); // total nutrition
    const [editing, setEditing] = useState(false);
    const [portions, setPortions] = useState(1);
    const [draftIngredients, setDraftIngredients] = useState("");
    const [ingredientsEditing, setIngredientsEditing] = useState(false);
    const [ingredientsCatalog, setIngredientsCatalog] = useState([]);
    const [ingredientEdits, setIngredientEdits] = useState([]);
    
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [favorite, setFavorite] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    // Fetch recipe info
    useEffect(() => {
        fetch(`http://localhost:8083/recipes/${id}`)
            .then(res => res.json())
            .then(data => setRecipe(data))
            .catch(err => console.error(err));
    }, [id]);

    // Update favorite state when user or recipe changes
    useEffect(() => {
        if (user && id) {
            setFavorite(isFavorite(user.id, parseInt(id, 10)));
        }
    }, [user, id]);

    // Fetch nutrition info based on portions and current ingredients
    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();
        const url = `http://localhost:8083/ingredients/recipe/${id}/nutrition`;
        const fetchNutrition = async () => {
            try {
                const response = (editing || ingredientsEditing)
                    ? await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            portions,
                            ingredients: draftIngredients
                        }),
                        signal: controller.signal,
                    })
                    : await fetch(`${url}?portions=${portions}`, { signal: controller.signal });

                if (!response.ok) {
                    setNutrition(null);
                    return;
                }

                const data = await response.json();
                setNutrition(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            }
        };

        const timeout = setTimeout(fetchNutrition, (editing || ingredientsEditing) ? 250 : 0);
        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [id, portions, editing, ingredientsEditing, draftIngredients]);

    useEffect(() => {
        if ((editing || ingredientsEditing) && recipe) {
            setDraftIngredients(recipe.ingredients || "");
        }
    }, [editing, ingredientsEditing, recipe]);

    useEffect(() => {
        if (!ingredientsEditing || ingredientsCatalog.length > 0) {
            return;
        }

        let active = true;
        fetch("http://localhost:8083/ingredients")
            .then((res) => res.json())
            .then((data) => {
                if (active) {
                    setIngredientsCatalog(Array.isArray(data) ? data : []);
                }
            })
            .catch((err) => console.error(err));

        return () => {
            active = false;
        };
    }, [ingredientsEditing, ingredientsCatalog.length]);

    useEffect(() => {
        if (!ingredientsEditing || !recipe || ingredientsCatalog.length === 0) {
            return;
        }
        if (ingredientEdits.length > 0) {
            return;
        }
        setIngredientEdits(buildIngredientEdits(recipe.ingredients || "", ingredientsCatalog));
    }, [ingredientsEditing, recipe, ingredientsCatalog, ingredientEdits.length]);

    useEffect(() => {
        if (!ingredientsEditing || ingredientEdits.length === 0 || ingredientsCatalog.length === 0) {
            return;
        }
        setDraftIngredients(buildIngredientsString(ingredientEdits, ingredientsCatalog));
    }, [ingredientsEditing, ingredientEdits, ingredientsCatalog]);

    const handleFavoriteToggle = async () => {
        if (!user || isToggling || !id) return;
        
        setIsToggling(true);
        try {
            const newFavoriteState = await toggleFavorite(user.id, parseInt(id, 10), favorite);
            setFavorite(newFavoriteState);
        } catch (error) {
            alert("Error updating favorite. Please try again.");
        } finally {
            setIsToggling(false);
        }
    };

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

    const startIngredientsEdit = () => {
        if (editing) return;
        setDraftIngredients(recipe?.ingredients || "");
        setIngredientsEditing(true);
    };

    const cancelIngredientsEdit = () => {
        setIngredientsEditing(false);
        setIngredientEdits([]);
    };

    const handleIngredientsSave = async () => {
        if (!recipe) return;
        const ingredientsText = draftIngredients || buildIngredientsString(ingredientEdits, ingredientsCatalog);
        const recipeData = {
            ...recipe,
            ingredients: ingredientsText,
        };

        const res = await fetch(`http://localhost:8083/recipes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipeData),
        });

        if (res.ok) {
            const data = await res.json();
            setRecipe(data);
            setIngredientsEditing(false);
            setIngredientEdits([]);
        } else {
            alert("Error saving ingredients.");
        }
    };

    const handleIngredientChange = (index, ingredientId) => {
        setIngredientEdits((prev) =>
            prev.map((item, i) => (i === index ? { ...item, ingredientId, factor: 1 } : item))
        );
    };

    const handleAmountChange = (index, factor) => {
        setIngredientEdits((prev) =>
            prev.map((item, i) => (i === index ? { ...item, factor } : item))
        );
    };

    const parseIngredient = (text) => {
        const t = text.trim();
        const match = t.match(/^(\d+(?:[.,]\d+)?)(\s*[a-zA-ZčćžšđČĆŽŠĐ]+)?\s*(.*)$/);
        if (!match) return null;
        const rawNum = match[1];
        const unit = (match[2] || "").trim();
        const rest = (match[3] || "").trim();
        const num = Number(rawNum.replace(",", "."));
        if (Number.isNaN(num)) return null;
        return { num, unit, rest };
    };

    const scaledIngredients = useMemo(() => {
        if (!recipe?.ingredients) return [];
        const list = recipe.ingredients.split(",").map((x) => x.trim()).filter(Boolean);
        return list.map((ingredient) => {
            const parsed = parseIngredient(ingredient);
            if (!parsed) return ingredient;
            const scaled = parsed.num * portions;
            const prefix = `${formatNumber(scaled)}${parsed.unit ? " " + parsed.unit : ""}`;
            return parsed.rest ? `${prefix} ${parsed.rest}` : prefix;
        });
    }, [recipe, portions]);

    const nutritionSummary = nutrition && (
        <div className="nutrition-summary-full">
            <h3>Nutrition (for {portions} portion{portions > 1 ? "s" : ""})</h3>
            <p><strong>Calories:</strong> {nutrition.totalCalories} kcal ({nutrition.percentageOfDaily.toFixed(1)}% of daily)</p>
            <p><strong>Protein:</strong> {nutrition.totalProtein} g</p>
            <p><strong>Carbs:</strong> {nutrition.totalCarbs} g</p>
            <p><strong>Fat:</strong> {nutrition.totalFat} g</p>
        </div>
    );

    const portionsInput = (
        <div style={{ marginTop: 12 }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Portions:</label>
            <input
                type="number"
                min="1"
                step="1"
                value={portions}
                onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") { setPortions(1); return; }
                    const n = parseInt(val, 10);
                    setPortions(Number.isFinite(n) && n > 0 ? n : 1);
                }}
                onBlur={() => { if (!Number.isFinite(portions) || portions < 1) setPortions(1); }}
                style={{ width: 90, padding: "6px 8px" }}
            />
        </div>
    );

    if (!recipe) return <div className="loading">Loading...</div>;

    return (
        <div className="recipe-details">
            {editing ? (
                <div className="edit-form-container">
                    <h2>Edit Recipe</h2>
                    <RecipeForm
                        recipeToEdit={recipe}
                        onSave={handleSave}
                        onIngredientsChange={setDraftIngredients}
                    />
                    {portionsInput}
                    <div style={{ marginTop: 20 }}>
                        <h2>Nutrition Preview</h2>
                        {nutritionSummary}
                    </div>
                </div>
            ) : (
                <>
                    <button className="back-button" onClick={() => navigate("/")}>← Back to Recipes</button>

                    <div className="recipe-header">
                        <div className="recipe-header-image-wrapper">
                            <img src={recipe.imageUrl || "/placeholder-image.jpg"} alt={recipe.name} className="recipe-detail-image" />
                            {user && (
                                <button
                                    className="favorite-btn"
                                    onClick={handleFavoriteToggle}
                                    disabled={isToggling}
                                    title={favorite ? "Remove from favorites" : "Add to favorites"}
                                    aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                                    style={{ width: '56px', height: '56px', fontSize: '1.75rem' }}
                                >
                                    {favorite ? '❤️' : '🤍'}
                                </button>
                            )}
                        </div>
                        <div className="recipe-info">
                            <h1>{recipe.name}</h1>
                            <p className="recipe-meta"><strong>Duration:</strong> {recipe.duration} minutes</p>
                            <p className="recipe-description">{recipe.description}</p>
                            <p className="recipe-category"><strong>Category:</strong> {recipe.category || "No category"}</p>

                            {portionsInput}
                        </div>
                    </div>
                    <div className="ingredients-section">
                        <h2>Nutrition</h2>
                        {nutritionSummary}
                    </div>




                    <div className="recipe-content">
                        <div className="ingredients-section">
                            <div className="ingredients-header">
                                <h2>Ingredients</h2>
                                {!ingredientsEditing && !editing && (
                                    <button className="edit-ingredients-btn" onClick={startIngredientsEdit}>
                                        Edit Ingredients
                                    </button>
                                )}
                            </div>
                            {ingredientsEditing ? (
                                ingredientsCatalog.length === 0 ? (
                                    <p>Loading ingredients...</p>
                                ) : (
                                    <div className="ingredients-editor">
                                        {ingredientEdits.map((item, index) => {
                                            const ingredient = ingredientsCatalog.find((ing) => ing.id === item.ingredientId)
                                                || ingredientsCatalog[0];
                                            const amountOptions = buildAmountOptions(ingredient, item.factor);
                                            return (
                                                <div className="ingredient-row" key={`${item.ingredientId || "item"}-${index}`}>
                                                    <select
                                                        value={item.ingredientId ? String(item.ingredientId) : ""}
                                                        onChange={(e) => handleIngredientChange(index, parseInt(e.target.value, 10))}
                                                    >
                                                        {ingredientsCatalog.map((ing) => (
                                                            <option key={ing.id} value={ing.id}>
                                                                {ing.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        value={String(item.factor || 1)}
                                                        onChange={(e) => handleAmountChange(index, parseFloat(e.target.value))}
                                                    >
                                                        {amountOptions.map((option) => (
                                                            <option key={option.factor} value={option.factor}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            );
                                        })}
                                        <div className="ingredients-edit-actions">
                                            <button className="submit-btn" onClick={handleIngredientsSave}>Save Ingredients</button>
                                            <button className="cancel-btn" onClick={cancelIngredientsEdit}>Cancel</button>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <ul className="ingredients-list">
                                    {scaledIngredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            )}
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

                    <div className="action-buttons action-buttons-bar">
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setDraftIngredients(recipe.ingredients || "");
                                setEditing(true);
                            }}
                            disabled={ingredientsEditing}
                        >
                            ✏️ Edit Recipe
                        </button>
                        <button className="btn btn-danger" onClick={deleteRecipe}>
                            🗑️ Delete Recipe
                        </button>
                        <button className="btn btn-outline" onClick={() => window.open(`http://localhost:8083/recipes/${id}/print/pdf`, "_blank")}>
                            👁️ Preview PDF
                        </button>
                        <button className="btn btn-primary" onClick={() => window.location.href = `http://localhost:8083/recipes/${id}/export/pdf`}>
                            📥 Download PDF
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default RecipeDetails;
