import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import Hero from "../components/Hero";
import imgRecipes from "../assets/img/recipes.jpg";
import RecipesSection from "../features/recipes/RecipesSection";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRandom,
  selectRecipes,
  selectStatus,
  selectTotalResults,
  selectNextQuery,
  selectError,
  fetchByQueryFirst,
  cleanRecipes,
  fetchByQueryNext,
} from "../features/recipes/recipesSlice";
import DisplayError from "../components/DisplayError";
import ButtonSearch from "../components/ButtonSearch";
import { MdOutlineClear } from "react-icons/md";

const SearchRecipe = () => {
  const dispatch = useDispatch();
  const recipesStatus = useSelector(selectStatus);
  const recipes = useSelector(selectRecipes);
  const totalRecipes = useSelector(selectTotalResults);
  const nextQuery = useSelector(selectNextQuery);
  const errorRecipes = useSelector(selectError);

  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorPage, setErrorPage] = useState(null);

  useEffect(() => {
    if (!nextQuery) {
      dispatch(fetchRandom());
    }
  }, []);

  useEffect(() => {
    if (errorRecipes.display) {
      setErrorPage(errorRecipes);
    }
  }, [errorRecipes]);

  useEffect(() => {
    /* used to manage placeholder input and search button */
    if (input.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [input]);

  const handleSearch = useCallback(() => {
    dispatch(cleanRecipes());
    dispatch(fetchByQueryFirst(input));
  }, [dispatch, input]);

  const handleDispatch = useCallback(() => {
    dispatch(fetchByQueryNext());
  }, [dispatch]);

  return (
    <>
      {errorPage && (
        <DisplayError {...errorPage} handleClose={() => setErrorPage(null)} />
      )}
      <Hero img={imgRecipes} mask={false}>
        <Container>
          <h1 className="font-custom display-1 text-center pt-5">
            Search for your favorite recipe
          </h1>
          <InputGroup className="mb-1">
            <Form.Control
              type="text"
              value={input}
              placeholder="Search..."
              onChange={(e) => setInput(e.target.value)}
            />
            {input.length > 0 && (
              <Button
                variant=""
                style={{
                  borderTop: "1px solid #ced4da",
                  borderBottom: "1px solid #ced4da",
                  backgroundColor: "#fff",
                }}
                onClick={() => {
                  setInput("");
                }}
              >
                <MdOutlineClear />
              </Button>
            )}
            <ButtonSearch handleSearch={handleSearch} isDisabled={isDisabled} />
          </InputGroup>
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

export default SearchRecipe;
