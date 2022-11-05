import React from "react";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import YourFridge from "./pages/YourFridge";
import MenuOffCanvas from "./components/MenuOffCanvas";
import SearchRecipe from "./pages/SearchRecipe";
import PageNotFound from "./pages/PageNotFound";
import RecipeDetails from "./pages/RecipeDetails";
import About from "./pages/About";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <MenuOffCanvas />
      <Routes>
        <Route path="/" element={<YourFridge />} />
        <Route path="/search-recipe" element={<SearchRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
