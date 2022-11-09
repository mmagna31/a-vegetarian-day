import React from "react";
import { ListGroup } from "react-bootstrap";
import { IngredientItem } from "./IngredientItem";
import { Scrollbars } from "react-custom-scrollbars-2";
import styles from "./HintsList.module.css";

const HintsList = ({ hints, handleClick }) => {
  return (
    <div className={styles.wrapperList}>
      {hints.length > 0 && (
        <ListGroup className={styles.list}>
          <Scrollbars
            style={{ width: "100%", height: 200 }}
            className="rounded border"
          >
            {hints.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                {...ingredient}
                handleClick={() => {
                  handleClick(ingredient);
                }}
              />
            ))}
          </Scrollbars>
        </ListGroup>
      )}
    </div>
  );
};

export default HintsList;
