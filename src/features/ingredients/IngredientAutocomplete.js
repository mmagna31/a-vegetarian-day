import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHints,
  cleanHints,
  selectHints,
  addIngredient,
  selectIngredients,
} from "./ingredientsSlice";
import { MdOutlineClear } from "react-icons/md";
import HintsList from "./HintsList";
import ButtonSearch from "../../components/ButtonSearch";

const IngredientAutocomplete = ({ handleSearch }) => {
  /* Set milliseconds spent to show the ingredients list */
  const SHOW_INGREDIENT_AFTER = 500;

  const dispatch = useDispatch();
  const hints = useSelector(selectHints);
  const ingredients = useSelector(selectIngredients);

  const [input, setInput] = useState("");
  const initialPlaceholder = "Type to search ingredient...";
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = (ingredient) => {
    dispatch(addIngredient(ingredient));
    dispatch(cleanHints());
    setInput("");
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (input !== " " && input.length >= 1) {
        const value = input.trim();
        dispatch(fetchHints(value));
      }
    }, SHOW_INGREDIENT_AFTER);
    return () => {
      return clearTimeout(timerId);
    };
  }, [input, dispatch]);

  useEffect(() => {
    /* used to manage placeholder input and search button */
    if (ingredients.length > 0) {
      setPlaceholder("Type to search ingredients or start search...");
      setIsDisabled(false);
    } else {
      setPlaceholder(initialPlaceholder);
      setIsDisabled(true);
    }
  }, [ingredients]);

  return (
    <>
      <InputGroup className="mb-1">
        <Form.Control
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
        />
        {input.length > 0 ? (
          <Button
            onClick={() => {
              setInput("");
              dispatch(cleanHints);
            }}
          >
            <MdOutlineClear />
          </Button>
        ) : (
          <ButtonSearch handleSearch={handleSearch} isDisabled={isDisabled} />
        )}
      </InputGroup>

      {input.length > 0 && (
        <HintsList hints={hints} handleClick={handleClick} />
      )}
    </>
  );
};

export default IngredientAutocomplete;
