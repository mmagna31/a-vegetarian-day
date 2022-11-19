import React from "react";
import { ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import TitleSection from "../../components/TitleSection";

const IngredientsList = ({ extendedIngredients }) => {
  return (
    <>
      <TitleSection>Ingredients</TitleSection>
      <ListGroup className="text-center">
        {extendedIngredients.map((ingredient) => (
          <ListGroup.Item key={uuidv4()} className="border-0">
            {ingredient.original}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default IngredientsList;
