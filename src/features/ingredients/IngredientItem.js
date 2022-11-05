import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { getUrlImageIngredient } from "../../api/spoonacular";
import styles from "./IngredientItem.module.css";

export const IngredientItem = ({ name, image, handleClick }) => {
  return (
    <ListGroup.Item>
      <Button variant="" onClick={handleClick}>
        {image && (
          <img
            className={styles.imgIngredient}
            src={getUrlImageIngredient(image)}
            alt={image}
          />
        )}{" "}
        <span className="text-capitalize">{name}</span>
      </Button>
    </ListGroup.Item>
  );
};
