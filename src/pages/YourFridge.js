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
  // selectNextIngredients,
} from "../features/recipes/recipesSlice";
import DisplayError from "../components/DisplayError";
import RecipesList from "../features/recipes/RecipesList";
import Loading from "../components/Loading";
import TitleSection from "../components/TitleSection";
import Section from "../components/Section";

const YourFridge = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const errorIngredients = useSelector(selectErrorIngredients);
  const errorRecipes = useSelector(selectErrorRecipes);
  const recipesStatus = useSelector(selectStatusRecipes);
  const recipes = useSelector(selectRecipes);
  const totalRecipes = useSelector(selectTotalResults);
  // const ingredientsToSearch = useSelector(selectNextIngredients);

  const [errorPage, setErrorPage] = useState(null);

  // const firstLoad = useCallback(() => {
  //   if (ingredients.length === 0 && recipes.length === 0) {
  //     dispatch(fetchRandom());
  //   }
  // }, [dispatch, ingredients, recipes]);

  useEffect(() => {
    /* retrieves random recipes at the first render of the page */
    // firstLoad();
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

  const handleReset = () => {
    setErrorPage(null);
  };

  const handleSearch = useCallback(() => {
    const ingredientsName = ingredients.map((ingredient) => ingredient.name);
    // if (
    //   JSON.stringify(ingredientsName) !== JSON.stringify(ingredientsToSearch)
    // ) {
    //   dispatch(cleanRecipes());
    // }
    dispatch(cleanRecipes());
    dispatch(fetchByIngredientsFirst(ingredientsName));
  }, [dispatch, ingredients]);

  const handleDispatch = useCallback(() => {
    dispatch(fetchByIngredientsNext());
  }, [dispatch]);

  return (
    <>
      {errorPage && <DisplayError {...errorPage} handleClose={handleReset} />}
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
      <Section>
        <TitleSection>Recipes</TitleSection>
        <p className="text-muted text-center">
          {totalRecipes > 0
            ? `We have ${totalRecipes} recipes`
            : recipes.length === 0
            ? "No recipes found for selected ingredients"
            : "Suggested"}
        </p>
        <RecipesList
          recipes={recipes}
          onDispatch={handleDispatch}
          totalRecipes={totalRecipes}
        />
        {recipesStatus === "loading" ? (
          <div className="text-center m-2">
            <Loading />
          </div>
        ) : (
          ""
        )}
      </Section>
    </>
  );
};

export default YourFridge;
