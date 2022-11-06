import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BiDish, BiTimeFive } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { GiThreeLeaves, GiGrain } from "react-icons/gi";

const RecipeSnippet = React.forwardRef(
  (
    {
      title,
      image,
      readyInMinutes,
      veryPopular,
      vegan,
      glutenFree,
      dishTypes,
      summary,
    },
    ref
  ) => {
    return (
      <Card ref={ref} style={{ width: "100%", height: "100%" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title className="font-custom text-truncate text-center fs-3">
            {title}
          </Card.Title>
          <Container>
            <Row>
              <Col>
                <BiDish size={30} />
                <span className="text-capitalize">{dishTypes?.join(", ")}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <BiTimeFive size={30} />{" "}
                <span className="fs-5">{readyInMinutes} Min</span>
              </Col>
              {veryPopular && (
                <Col>
                  <AiOutlineLike size={30} />{" "}
                  <span className="fs-5">Very Popular</span>
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                {vegan && (
                  <span>
                    <GiThreeLeaves size={30} />{" "}
                    <span className="fs-5">Vegan</span>
                  </span>
                )}{" "}
                {glutenFree && (
                  <span>
                    <GiGrain size={30} />{" "}
                    <span className="fs-5">Gluten Free</span>
                  </span>
                )}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
);

export default RecipeSnippet;
