import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BiTimeFive } from "react-icons/bi";
import { GiThreeLeaves, GiGrain } from "react-icons/gi";
import Sanitized from "../../components/Sanitized";
import { truncate } from "../../utils/truncate";

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
      <Card ref={ref} className="shadow w-100 h-100">
        <Card.Img variant="top" src={image} className="shadow" />
        <Card.Body className="bg-secondary">
          <Card.Title className="font-custom text-truncate text-center fs-3 text-primary">
            {title}
          </Card.Title>

          <Container>
            <Row>
              <Col className="text-capitalize text-center">
                <p className="text-muted">
                  {dishTypes.length > 0
                    ? dishTypes.join(", ")
                    : "Good for any occasion"}
                </p>
                <Sanitized
                  className="justifyText"
                  htmlString={summary ? truncate(summary, 100) : ""}
                />
              </Col>
            </Row>
            <Row>
              <Col className="text-center mb-4">
                <BiTimeFive size={20} /> Ready in {readyInMinutes} Min
              </Col>
            </Row>
            {(vegan || glutenFree) && (
              <Row className="border rounded p-2 bg-primary text-white shadow">
                <p className="text-center">That is even:</p>
                <Col className="d-flex justify-content-around">
                  {vegan && (
                    <span>
                      <GiThreeLeaves size={20} /> Vegan
                    </span>
                  )}
                  {glutenFree && (
                    <span>
                      <GiGrain size={20} />
                      Gluten Free
                    </span>
                  )}
                </Col>
              </Row>
            )}
          </Container>
        </Card.Body>
      </Card>
    );
  }
);

export default RecipeSnippet;
