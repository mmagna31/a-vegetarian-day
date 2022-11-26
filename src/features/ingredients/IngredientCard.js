import React from "react";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { getUrlImageIngredient } from "../../api/repository";
import { removeIngredient } from "./ingredientsSlice";
import DefaultImg from "../../assets/img/card_default.jpg";
import styled from "styled-components";

const IngredientCard = ({ id, name, image }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeIngredient(id));
  };

  return (
    // forcing overwrite min-width property of card bootstrap
    <Card style={{ width: "100px" }}>
      <CardImgWrapper
        variant="top"
        src={(image && getUrlImageIngredient(image)) || DefaultImg}
      />
      <Card.Body className="text-center p-0">
        <p className="font-custom text-capitalize text-truncate m-0 text-dark">
          {name}
        </p>
        <RemoveButton onClick={handleClick}>
          <MdDeleteForever />
        </RemoveButton>
      </Card.Body>
    </Card>
  );
};

export default IngredientCard;

const RemoveButton = styled.button`
  border-style: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
`;

const CardImgWrapper = styled(Card.Img)`
  height: 70px;
  object-fit: contain;
`;
