import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IngredientItem } from "./IngredientItem";
import { addIngredient, cleanHints, selectHints } from "./ingredientsSlice";
import { Scrollbars } from "react-custom-scrollbars-2";
import styles from "./HintsList.module.css";

const HintsList = ({ extraAction }) => {
  const dispatch = useDispatch();
  const hints = useSelector(selectHints);
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
                  dispatch(addIngredient(ingredient));
                  dispatch(cleanHints());
                  if (extraAction) extraAction();
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
