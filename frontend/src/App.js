import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import Login from "./components/Login";
import Favorites from "./components/Favorites";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RecipeList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recipe/:id" element={<RecipeDetails />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </Router>
    );
}

export default App;
