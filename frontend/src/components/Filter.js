import React, { useState } from "react";

function Filter({ onFilter }) {
    const [category, setCategory] = useState("");
    const [label, setLabel] = useState("");

    const handleApply = () => {
        console.log("Filter clicked with category:", category, "label:", label); // <--- debug
        onFilter(category, label); // call parent with current states
    };

    const handleLabelChange = (value) => {
        setLabel(prev => prev === value ? "" : value); // toggle single label
    };

    return (
        <div className="filter">
            <label>Category:</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Sweets">Sweets</option>
                <option value="Salads">Salads</option>
                <option value="Meat">Meat</option>
                <option value="Pasta">Pasta</option>
                <option value="Soup">Soup</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Dinner">Dinner</option>
                <option value="Healthy">Healthy</option>
            </select>

            <div className="labels">
                <label className={`label-pill ${label === "Vegan" ? "selected" : ""}`}>
                    <input
                        type="checkbox"
                        checked={label === "Vegan"}
                        onChange={() => handleLabelChange("Vegan")}
                    />
                    Vegan
                </label>
                <label className={`label-pill ${label === "Vegetarian" ? "selected" : ""}`}>
                    <input
                        type="checkbox"
                        checked={label === "Vegetarian"}
                        onChange={() => handleLabelChange("Vegetarian")}
                    />
                    Vegetarian
                </label>
            </div>

            <button onClick={handleApply} className="btn btn-primary">
                Apply Filter
            </button>
        </div>
    );
}

export default Filter;
