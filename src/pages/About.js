import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Hero from "../components/Hero";
import logo from "../assets/img/logo_200x200.png";

const About = () => {
  return (
    <>
      <Hero mask={false}>
        <Container fluid>
          <Row>
            <Col className="text-center p-5">
              <h3 className="text-uppercase custom-font">
                If you don't want meat today, it's the best time for
              </h3>
              <h1 className="display-4 fw-bold text-uppercase custom-font">
                A vegetarian day
              </h1>
            </Col>
          </Row>
        </Container>
      </Hero>
      <Container>
        <Row>
          <p className="lead mt-5">
            There are days when you wake up and don't feel like eating meat.
            Maybe because you exaggerated the day before or simply because today
            you want to be light. This is the ideal place to find what you can
            cook with what you have in the fridge while discovering the most
            delicious vegetarian dishes.
          </p>
        </Row>
        <Row>
          <Col className="text-center">
            <img src={logo} className="w-25" alt="A Vegetarian Day" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
