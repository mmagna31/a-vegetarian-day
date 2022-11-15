import React, { useCallback, useEffect, useRef } from "react";
import RecipeSnippet from "./RecipeSnippet";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import WrappedLink from "../../components/WrappedLink";

const RecipesList = ({ recipes, totalRecipes, onDispatch }) => {
  const recipeRef = useRef(null); // ref assegnato ad ultima ricetta per eseguire intersectionCallback

  const intersectionCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      // entries.forEach((entry) => {
      if (entry.isIntersecting && totalRecipes > recipes.length) {
        onDispatch();
      }
      // });
    },
    [onDispatch, recipes, totalRecipes]
  );

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    let targetRef;

    const observer = new IntersectionObserver(intersectionCallback, options);

    if (recipeRef.current) {
      targetRef = recipeRef.current;
      observer.observe(targetRef);
    }

    return () => {
      if (targetRef) observer.unobserve(targetRef);
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
              {/* <WrappedLink to={`/recipes/${id}`}> */}
              <Link to={`/recipes/${id}`}>
                <RecipeSnippet
                  ref={id === lastId ? recipeRef : null}
                  {...recipe}
                />
                {/* </WrappedLink> */}
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default RecipesList;
