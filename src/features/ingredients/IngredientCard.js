import React from "react";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { getUrlImageIngredient } from "../../api/repository";
import { removeIngredient } from "./ingredientsSlice";
import DefaultImg from "../../assets/img/card_default.jpg";
import styles from "./IngredientCard.module.css";

const IngredientCard = ({ id, name, image }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeIngredient(id));
  };

  return (
    // forcing overwrite min-width property of card bootstrap
    <Card style={{ width: "100px" }} className={styles.ingredientCard1}>
      <Card.Img
        variant="top"
        className={styles.imgCard}
        src={(image && getUrlImageIngredient(image)) || DefaultImg}
      />
      <Card.Body className="text-center p-0">
        <p className="font-custom text-capitalize text-truncate m-0">{name}</p>
        <button className={styles.removeBtn} onClick={handleClick}>
          <MdDeleteForever />
        </button>
      </Card.Body>
    </Card>
  );
};

export default IngredientCard;
