import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { GiThreeLeaves, GiGrain } from "react-icons/gi";

const RecipeSnippet = React.forwardRef(
  (
    { title, image, readyInMinutes, veryPopular, vegan, glutenFree, dishTypes },
    ref
  ) => {
    return (
      <Card ref={ref} style={{ width: "100%" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title className="font-custom fw-bold">{title}</Card.Title>
          <Container>
            <Row>
              <Col>
                <BiTimeFive /> {readyInMinutes} Min
              </Col>
              {veryPopular && (
                <Col>
                  <AiOutlineLike /> Very Popular
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                {vegan && (
                  <span>
                    <GiThreeLeaves /> Vegan
                  </span>
                )}{" "}
                {glutenFree && (
                  <span>
                    <GiGrain /> Gluten Free
                  </span>
                )}
              </Col>
            </Row>
            <Row>
              <Col>Dish Types: {dishTypes?.join(", ")}</Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
);

export default RecipeSnippet;
