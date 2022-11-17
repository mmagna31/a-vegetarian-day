import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const RecipeShortInfo = ({ title, image }) => {
  return (
    <Container>
      <Row className="border rounded">
        <Col xs={12} md={6} className="rounded order-md-1 p-0">
          <img
            style={{ width: "100%" }}
            className="rounded"
            src={image}
            alt={title}
          />
        </Col>
        <Col xs={12} md={6} className="order-md-0 p-0">
          {/* <GeneralInfo {...data} /> */}Test
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeShortInfo;
