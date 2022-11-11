import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import IngredientCard from "./IngredientCard";
import { removeIngredient } from "./ingredientsSlice";
import styles from "./IngredientsList.module.css";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { animateScroll as scroll } from "react-scroll";

const IngredientsList = ({ ingredients }) => {
  const dispatch = useDispatch();

  const handleClick = (ingredient) => {
    dispatch(removeIngredient(ingredient));
  };

  const handleScroll = (value) => {
    scroll.scrollMore(value, {
      horizontal: true,
      containerId: "ingredientsContainer",
      smooth: "linear",
    });
  };

  // ref
  const boxContainerRef = useRef(null); // container per calcolare width
  const ingrContainerRef = useRef(null); // container per verificare scroll width
  const backRef = useRef(null); // controll back
  const forwardRef = useRef(null); // controll forward
  const [isBackVisible, setIsBackVisible] = useState(false); // stato per verificare se deve essere visibile
  const [isForwardVisible, setIsForwardVisible] = useState(false); // stato per verificare se deve essere visibile
  const firstIngrRef = useRef(null); // primo ingrediente da controllare se visibile per back control
  const lastIngrRef = useRef(null); // ultimo ingrediente da controllare se visibile per forward control

  useEffect(() => {
    if (ingredients.length > 0) {
      let targetRef = null;
      const options = {
        root: ingrContainerRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const intersectionCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsBackVisible(false);
          } else {
            setIsBackVisible(true);
          }
        });
      };

      let observerBack = new IntersectionObserver(
        intersectionCallback,
        options
      );
      if (firstIngrRef.current) {
        targetRef = firstIngrRef.current;
        observerBack.observe(targetRef);
      }

      return () => {
        if (targetRef) observerBack.unobserve(targetRef);
      };
    }
  }, [firstIngrRef, ingredients]);

  useEffect(() => {
    if (ingredients.length > 0) {
      let targetRef = null;
      const options = {
        root: ingrContainerRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const intersectionCallback = (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting ||
            ingrContainerRef.current.scrollWidth <=
              boxContainerRef.current.clientWidth
          ) {
            setIsForwardVisible(false);
          } else {
            setIsForwardVisible(true);
          }
        });
      };

      let observerForward = new IntersectionObserver(
        intersectionCallback,
        options
      );
      if (lastIngrRef.current) {
        targetRef = lastIngrRef.current;
        observerForward.observe(targetRef);
      }

      return () => {
        if (targetRef) observerForward.unobserve(targetRef);
      };
    }
  }, [lastIngrRef, ingredients]);

  // if (ingredients.length === 0) {
  //   return (
  //     <Container className="text-center" style={{ height: "130px" }}>
  //       No ingredients selected
  //     </Container>
  //   );
  // }

  return (
    <Container
      ref={boxContainerRef}
      style={{
        position: "relative",
        height: "130px",
        padding: "0",
      }}
    >
      <Container
        ref={ingrContainerRef}
        id="ingredientsContainer"
        className={`d-flex ${styles.ingredientsContainer}`}
        style={{ position: "absolute" }}
      >
        {ingredients.map((ingredient) => {
          const { id } = ingredient;
          const firstId = ingredients[0].id;
          const lastId = ingredients[ingredients.length - 1].id;

          return (
            <IngredientCard
              ref={
                id === firstId
                  ? firstIngrRef
                  : lastId === id
                  ? lastIngrRef
                  : null
              }
              key={ingredient.id}
              {...ingredient}
              onClick={() => handleClick(ingredient)}
            />
          );
        })}
      </Container>
      <Container style={{ position: "absolute", paddingTop: "45px" }}>
        <Row>
          <Col>
            {isBackVisible && (
              <button
                ref={backRef}
                className={styles.controlsBtn}
                onClick={() => handleScroll(-200)}
              >
                <MdOutlineArrowBackIos size={30} />
              </button>
            )}
          </Col>
          <Col className="d-flex justify-content-end">
            {isForwardVisible && (
              <button
                ref={forwardRef}
                className={styles.controlsBtn}
                onClick={() => handleScroll(200)}
              >
                <MdOutlineArrowForwardIos size={30} />
              </button>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default IngredientsList;
