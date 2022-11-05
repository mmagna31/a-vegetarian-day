import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectIngredients } from "./ingredientsSlice";

const ButtonSearch = ({ handleSearch }) => {
  const ingredients = useSelector(selectIngredients);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    handleSearch();
    setIsDisabled(true);
  };

  //checking ingredient change
  useEffect(() => {
    if (ingredients.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [ingredients]);

  return (
    <Button onClick={handleClick} disabled={isDisabled}>
      <BiSearch />
    </Button>
  );
};

export default ButtonSearch;
