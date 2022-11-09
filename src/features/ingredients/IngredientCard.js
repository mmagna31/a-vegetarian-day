import React from "react";
import { Card } from "react-bootstrap";
import DefaultImg from "../../assets/img/card_default.jpg";
import { MdDeleteForever } from "react-icons/md";
import { getUrlImageIngredient } from "../../api/repository";
import styles from "./IngredientCard.module.css";

const IngredientCard = React.forwardRef(({ name, image, onClick }, ref) => {
  return (
    // forcing overwrite min-width property of card bootstrap
    <Card
      style={{ width: "100px" }}
      className={styles.ingredientCard}
      ref={ref}
    >
      <Card.Img
        variant="top"
        className={styles.imgCard}
        src={(image && getUrlImageIngredient(image)) || DefaultImg}
      />
      <Card.Body className="text-center p-0">
        <p className="font-custom text-capitalize text-truncate m-0">{name}</p>
        <button className={styles.removeBtn} onClick={onClick}>
          <MdDeleteForever />
        </button>
      </Card.Body>
    </Card>
  );
});

export default IngredientCard;
