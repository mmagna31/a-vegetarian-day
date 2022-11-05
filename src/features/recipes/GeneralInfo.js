import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BiDish, BiTimeFive } from "react-icons/bi";
import {
  GiGrain,
  GiKnifeFork,
  GiMilkCarton,
  GiThreeLeaves,
} from "react-icons/gi";

const GeneralInfo = ({
  servings,
  readyInMinutes,
  dishTypes,
  vegan,
  glutenFree,
  dairyFree,
  occasions,
}) => {
  return (
    <Container className="border">
      <Row>
        <Col>
          <GiKnifeFork />
          Serving {servings}
        </Col>
        <Col>
          <BiTimeFive /> Ready in {readyInMinutes} MIN
        </Col>
      </Row>
      <Row>
        <Col>
          <BiDish /> Dish Types {dishTypes?.join(", ")}
        </Col>
      </Row>
      <Row>
        {vegan ? (
          <Col>
            <GiThreeLeaves /> Vegan
          </Col>
        ) : (
          ""
        )}
        {glutenFree ? (
          <Col>
            <GiGrain /> Gluten Free
          </Col>
        ) : (
          ""
        )}
        {dairyFree ? (
          <Col>
            <GiMilkCarton />
            Dairy Free
          </Col>
        ) : (
          ""
        )}
      </Row>
      <Row>
        <Col>
          <p>Ideal for occasion: {occasions?.join(", ")}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default GeneralInfo;
