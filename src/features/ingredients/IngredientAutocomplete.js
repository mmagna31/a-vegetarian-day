import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchHints, cleanHints } from "./ingredientsSlice";
import { MdOutlineClear } from "react-icons/md";
import HintsList from "./HintsList";
import ButtonSearch from "./ButtonSearch";

const IngredientAutocomplete = ({ handleSearch }) => {
  /* Set milliseconds spent to show the ingredients list */
  const SHOW_INGREDIENT_AFTER = 1000;

  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    // TODO: inserire un controllo per verificare quando far partire questa funzione
    dispatch(cleanHints());

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

  return (
    <>
      <InputGroup className="mb-1">
        <Form.Control
          type="text"
          value={input}
          placeholder="Search ingredient..."
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
          <ButtonSearch handleSearch={handleSearch} />
        )}
      </InputGroup>

      {input.length > 0 && <HintsList extraAction={() => setInput("")} />}
    </>
  );
};

export default IngredientAutocomplete;
