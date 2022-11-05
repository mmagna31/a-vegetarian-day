import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../features/ingredients/ingredientsSlice";
import recipesReducer from "../features/recipes/recipesSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
  },
});
