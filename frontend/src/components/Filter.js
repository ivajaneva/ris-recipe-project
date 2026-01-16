import React, { useState } from "react";

function Filter(props) {
    const [category, setCategory] = useState("");

    const handleApply = () => {
        // Povikaj the parent function koja ja predade prkeu props
        props.onFilter(category);
    };

    return (
        <div className="filter">
            <label>Filter by category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Sweets">Sweets</option>
                <option value="Salads">Salads</option>
                <option value="Meat">Meat</option>
                <option value="Pasta">Pasta</option>
                <option value="Soup">Soup</option>
            </select>
            <button className="btn btn-primary" onClick={handleApply}>
                Apply Filter
            </button>
        </div>
    );
}

export default Filter;
