import React, { useCallback, useEffect, useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import Hero from "../components/Hero";
import imgRecipes from "../assets/img/pasta.jpg";
import RecipesSection from "../features/recipes/RecipesSection";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRandom,
  selectRecipes,
  selectStatus,
  selectTotalResults,
  selectError,
  fetchByQueryFirst,
  cleanRecipes,
  fetchByQueryNext,
  reset as resetRecipes,
} from "../features/recipes/recipesSlice";
import DisplayError from "../components/DisplayError";
import ButtonSearch from "../components/ButtonSearch";
import { MdOutlineClear } from "react-icons/md";
import useDisplayError from "../hooks/useDisplayError";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const SearchRecipe = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const recipesStatus = useSelector(selectStatus);
  const recipes = useSelector(selectRecipes);
  const totalRecipes = useSelector(selectTotalResults);
  const errorRecipes = useSelector(selectError);

  const error = useDisplayError(errorRecipes);

  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!location?.state?.includes("/recipes/")) {
      dispatch(resetRecipes());
      dispatch(fetchRandom());
    }
  }, [location, dispatch]);

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
      {error && (
        <DisplayError {...error} handleClose={() => dispatch(resetRecipes())} />
      )}
      <Hero img={imgRecipes} mask={true}>
        <Container className="textHero">
          <h1 className="font-custom display-1 text-center p-5">
            Search for your favorite recipes
          </h1>
          <InputGroup className="fixedWidthMd mb-5">
            <Form.Control
              type="text"
              value={input}
              placeholder="Type to search recipes..."
              onChange={(e) => setInput(e.target.value)}
            />
            {input.length > 0 && (
              <DelButton
                onClick={() => {
                  setInput("");
                }}
              >
                <MdOutlineClear size={20} />
              </DelButton>
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

const DelButton = styled.button`
  border: none;
  background-color: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 50px;
  z-index: 999;
`;
