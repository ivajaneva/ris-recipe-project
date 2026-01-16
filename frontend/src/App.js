import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import Login from "./components/Login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RecipeList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
