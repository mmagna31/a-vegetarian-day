import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import Hero from "../components/Hero";
import imgRecipes from "../assets/img/pasta.jpg";
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
  reset,
} from "../features/recipes/recipesSlice";
import DisplayError from "../components/DisplayError";
import ButtonSearch from "../components/ButtonSearch";
import { MdOutlineClear } from "react-icons/md";
import useDisplayError from "../hooks/useDisplayError";
import styled from "styled-components";

const SearchRecipe = () => {
  const dispatch = useDispatch();
  const recipesStatus = useSelector(selectStatus);
  const recipes = useSelector(selectRecipes);
  const totalRecipes = useSelector(selectTotalResults);
  const nextQuery = useSelector(selectNextQuery);
  const errorRecipes = useSelector(selectError);

  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const error = useDisplayError(errorRecipes);

  useEffect(() => {
    if (!nextQuery) {
      dispatch(fetchRandom());
    }
  }, []);

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
        <DisplayError {...error} handleClose={() => dispatch(reset())} />
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
