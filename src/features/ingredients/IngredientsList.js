import React, { useEffect, useRef, useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { animateScroll as scroll, Events, scrollSpy } from "react-scroll";
import IngredientCard from "./IngredientCard";
import styles from "./IngredientsList.module.css";
import {
  canScrollToLeft,
  canScrollToRight,
} from "../../utils/elementScrollable";

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
  const scrollContainerRef = useRef(null);

  const [isLeftActive, setIsLeftActive] = useState(true);
  const [isRightActive, setIsRightActive] = useState(true);

  const handleScroll = (value) => {
    scroll.scrollMore(value, {
      horizontal: true,
      containerId: "ingredients",
      smooth: "linear",
    });
  };

  useEffect(() => {
    Events.scrollEvent.register("end", () => {
      console.log("check", canScrollToRight(scrollContainerRef.current));
      setIsRightActive(canScrollToRight(scrollContainerRef.current));
    });

    // Events.scrollEvent.register("end",()=> {})
    // });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  // const IngredientsList = ({ ingredients }) => {
  return (
    <div className={styles.scrollWrapper}>
      <div
        ref={scrollContainerRef}
        id="ingredients"
        className={styles.scrollContainer}
      >
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
        {isLeftActive && (
          <button
            onClick={() => {
              handleScroll(-200);
            }}
          >
            <MdOutlineArrowBackIos size={30} />
          </button>
        )}
        {isRightActive && (
          <span className={`${styles.rightControl}`}>
            <button
              onClick={() => {
                handleScroll(200);
              }}
            >
              <MdOutlineArrowForwardIos size={30} />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default IngredientsList;
