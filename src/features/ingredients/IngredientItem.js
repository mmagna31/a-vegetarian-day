import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { getUrlImageIngredient } from "../../api/repository";
import styled from "styled-components";

const IngredientItem = ({ name, image, handleClick }) => {
  return (
    <ListGroup.Item>
      <Button variant="" onClick={handleClick}>
        {image && (
          <ImgIngredient src={getUrlImageIngredient(image)} alt={image} />
        )}{" "}
        <span className="text-capitalize">{name}</span>
      </Button>
    </ListGroup.Item>
  );
};

export default IngredientItem;

const ImgIngredient = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;
