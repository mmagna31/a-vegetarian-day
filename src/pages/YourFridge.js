import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Hero from "../components/Hero";
import intro from "../assets/img/intro.jpg";
import IngredientAutocomplete from "../features/ingredients/IngredientAutocomplete";
import IngredientsList from "../features/ingredients/IngredientsList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError as selectErrorIngredients,
  selectIngredients,
} from "../features/ingredients/ingredientsSlice";
import {
  fetchRandom,
  selectError as selectErrorRecipes,
  selectStatus as selectStatusRecipes,
  selectRecipes,
  cleanRecipes,
  selectTotalResults,
  fetchByIngredientsFirst,
  fetchByIngredientsNext,
} from "../features/recipes/recipesSlice";
import DisplayError from "../components/DisplayError";
import RecipesSection from "../features/recipes/RecipesSection";

const YourFridge = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const errorIngredients = useSelector(selectErrorIngredients);
  const errorRecipes = useSelector(selectErrorRecipes);
  const recipesStatus = useSelector(selectStatusRecipes);
  const recipes = useSelector(selectRecipes);
  const totalRecipes = useSelector(selectTotalResults);

  const [errorPage, setErrorPage] = useState(null);

  useEffect(() => {
    /* retrieves random recipes at the first render of the page */
    if (ingredients.length === 0 && recipes.length === 0) {
      dispatch(fetchRandom());
    }
  }, []);

  useEffect(() => {
    if (errorIngredients.display) {
      setErrorPage(errorIngredients);
    } else if (errorRecipes.display) {
      setErrorPage(errorRecipes);
    }
  }, [errorIngredients, errorRecipes]);

  const handleSearch = useCallback(() => {
    const ingredientsName = ingredients.map((ingredient) => ingredient.name);
    dispatch(cleanRecipes());
    dispatch(fetchByIngredientsFirst(ingredientsName));
  }, [dispatch, ingredients]);

  const handleDispatch = useCallback(() => {
    dispatch(fetchByIngredientsNext());
  }, [dispatch]);

  return (
    <>
      {errorPage && (
        <DisplayError {...errorPage} handleClose={() => setErrorPage(null)} />
      )}
      <Hero img={intro} mask={false}>
        <Container>
          <h1 className="font-custom display-1 text-center pt-5">
            What's in your frigde?
          </h1>
          <p className="lead text-center pb-5">
            Add ingredients to find out what you can cook with them.
          </p>
          <IngredientsList ingredients={ingredients} />
          <IngredientAutocomplete handleSearch={handleSearch} />
          <p className="text-muted text-center pb-5">
            Non-vegan ingredients will not be included in the search.
          </p>
        </Container>
      </Hero>
      <RecipesSection
        totalRecipes={totalRecipes}
        recipes={recipes}
        recipesStatus={recipesStatus}
        handleDispatch={handleDispatch}
      />
    </>
  );
};

export default YourFridge;
