import React, { useCallback, useEffect, useRef } from "react";
import RecipeSnippet from "./RecipeSnippet";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecipes, selectTotalResults } from "./recipesSlice";

const RecipesList = ({ onDispatch }) => {
  const recipes = useSelector(selectRecipes);
  const totalResults = useSelector(selectTotalResults);

  const recipeRef = useRef(null); // ref assegnato ad ultima ricetta per eseguire intersectionCallback

  const intersectionCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      // entries.forEach((entry) => {
      console.log("VISIBILE?", entry.isIntersecting, entry.target);
      console.log("target", entry.target);
      if (entry.isIntersecting && totalResults > recipes.length) {
        alert("onDispatch");
        onDispatch(); //---------------------------------------------------------
      }
      // });
    },
    [onDispatch, recipes, totalResults]
  );

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    // let targetRef;

    const observer = new IntersectionObserver(intersectionCallback, options);

    if (recipeRef.current) {
      // targetRef = recipeRef.current;
      // observer.observe(targetRef);
      observer.observe(recipeRef.current);
    }

    return () => {
      // if (targetRef) observer.unobserve(targetRef);
      if (recipeRef.current) observer.unobserve(recipeRef.current);
    };
  }, [recipeRef, intersectionCallback]);

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {recipes.map((recipe) => {
          const { id } = recipe;
          const lastId = recipes[recipes.length - 1].id;
          return (
            <Col key={id}>
              <Link to={`/recipes/${id}`}>
                <RecipeSnippet
                  ref={id === lastId ? recipeRef : null}
                  {...recipe}
                />
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default RecipesList;
