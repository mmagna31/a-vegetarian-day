import React from "react";
import { Container } from "react-bootstrap";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { animateScroll as scroll } from "react-scroll";
import IngredientCard from "./IngredientCard";
import styles from "./IngredientsList.module.css";

const ingredients = [
  { id: 1, name: "apple", image: "apple.jpg" },
  { id: 2, name: "apple", image: "apple.jpg" },
  { id: 3, name: "apple", image: "apple.jpg" },
  { id: 4, name: "apple", image: "apple.jpg" },
  { id: 5, name: "apple", image: "apple.jpg" },
  { id: 6, name: "apple", image: "apple.jpg" },
  { id: 7, name: "apple", image: "apple.jpg" },
];

const IngredientsList = () => {
  const handleScroll = (value) => {
    scroll.scrollMore(value, {
      horizontal: true,
      containerId: "ingredients",
      smooth: "linear",
    });
  };

  // const IngredientsList = ({ ingredients }) => {
  return (
    <div className={styles.scrollWrapper}>
      <div id="ingredients" className={styles.scrollContainer}>
        <ul>
          {ingredients.map((ingredient) => {
            const { id } = ingredient;
            return (
              <li key={id}>
                <IngredientCard {...ingredient} />
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.controls}>
        <button onClick={() => handleScroll(-200)}>
          <MdOutlineArrowBackIos size={30} />
        </button>
        <button onClick={() => handleScroll(200)}>
          <MdOutlineArrowForwardIos size={30} />
        </button>
      </div>
    </div>
  );
};

export default IngredientsList;
