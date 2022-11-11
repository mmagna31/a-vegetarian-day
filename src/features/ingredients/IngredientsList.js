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

const IngredientsList = ({ ingredients }) => {
  const scrollContainerRef = useRef(null);

  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  const handleScroll = (value) => {
    scroll.scrollMore(value, {
      horizontal: true,
      containerId: "ingredients",
      smooth: "linear",
    });
  };

  const checkControls = () => {
    setIsLeftActive(canScrollToLeft(scrollContainerRef.current));
    setIsRightActive(canScrollToRight(scrollContainerRef.current));
  };

  useEffect(() => {
    /* Assign event to manage controls visibility on the first render */
    Events.scrollEvent.register("end", checkControls);

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("end");
    };
  }, []);

  useEffect(() => {
    checkControls();
  }, [ingredients]);

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
