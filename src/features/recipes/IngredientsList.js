import React from "react";
import { ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const IngredientsList = ({ extendedIngredients }) => {
  return (
    <>
      <h2 className="font-custom text-center">Ingredients</h2>
      <ListGroup>
        {extendedIngredients.map((ingredient) => (
          <ListGroup.Item key={uuidv4()}>{ingredient.original}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default IngredientsList;
