import React from "react";
import { Container } from "react-bootstrap";
import Hero from "../components/Hero";
import Logo from "../assets/img/logo_primary.png";
import AboutImg from "../assets/img/woman-green.jpg";

const About = () => {
  return (
    <>
      <Hero img={AboutImg} mask={true}>
        <Container fluid className="textHero">
          <div className="text-center p-5">
            <h1 className="font-custom display-3 text-center pt-5">
              If you don't want meat today,
              <br />
              it's the best time for a vegetarian day
            </h1>
          </div>
        </Container>
      </Hero>
      <Container className="text-center ">
        <p className="lead mt-5">
          There are days when you wake up and don't feel like eating meat. Maybe
          because you exaggerated the day before or simply because today you
          want to be light. This is the ideal place to find what you can cook
          with what you have in the fridge while discovering the most delicious
          vegetarian dishes.
        </p>
        <img
          src={Logo}
          style={{ width: "100px" }}
          alt="A Vegetarian Day"
          className="m-2"
        />
      </Container>
    </>
  );
};

export default About;
