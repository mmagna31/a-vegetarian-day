import React, { useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import Hero from "../components/Hero";
import imgIntro from "../assets/img/tomatoes.jpg";
import IngredientAutocomplete from "../features/ingredients/IngredientAutocomplete";
import IngredientsList from "../features/ingredients/IngredientsList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError as selectErrorIngredients,
  selectIngredients,
  reset as resetIngredients,
  selectStatus as selectStatusHints,
  cleanSelected,
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
  reset as resetRecipes,
} from "../features/recipes/recipesSlice";
import DisplayError from "../components/DisplayError";
import RecipesSection from "../features/recipes/RecipesSection";
import useDisplayError from "../hooks/useDisplayError";

const YourFridge = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const errorIngredients = useSelector(selectErrorIngredients);
  const errorRecipes = useSelector(selectErrorRecipes);
  const recipesStatus = useSelector(selectStatusRecipes);
  const hintsStatus = useSelector(selectStatusHints);
  const recipes = useSelector(selectRecipes);
  const totalRecipes = useSelector(selectTotalResults);

  const error = useDisplayError(errorRecipes, errorIngredients);

  useEffect(() => {
    /* retrieves random recipes at the first render of the page */
    dispatch(fetchRandom());
    // }
    if (selectIngredients.length > 0) dispatch(cleanSelected());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(() => {
    const ingredientsName = ingredients.map((ingredient) => ingredient.name);
    dispatch(cleanRecipes());
    dispatch(fetchByIngredientsFirst(ingredientsName));
  }, [dispatch, ingredients]);

  const handleDispatch = useCallback(() => {
    dispatch(fetchByIngredientsNext());
  }, [dispatch]);

  const handleClose = () => {
    if (recipesStatus === "failed") dispatch(resetRecipes());
    if (hintsStatus === "failed") dispatch(resetIngredients());
  };

  return (
    <>
      {error && <DisplayError {...error} handleClose={handleClose} />}
      <Hero img={imgIntro} mask={true}>
        <Container className="text-center textHero">
          <h1 className="font-custom display-1 pt-5 text-white">
            What's in your frigde?
          </h1>
          <p className="pb-5 lead text-white" style={{ fontSize: "2.0rem" }}>
            Add ingredients below to find out what you can cook with them.
          </p>
          <IngredientsList ingredients={ingredients} />
          <IngredientAutocomplete handleSearch={handleSearch} />
          <p className="pb-5 text-white">
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
