import React from "react";
import { Container } from "react-bootstrap";
import Logo from "../assets/img/logo_200x200.png";

const Footer = () => {
  return (
    <footer>
      <Container className="text-center bg-black p-3" fluid>
        <img
          src={Logo}
          width="35"
          height="35"
          className="d-inline-block align-top"
          alt="A Vegetarian Day"
        />{" "}
        <span className="d-block font-custom">A vegetarian Day</span>
      </Container>
    </footer>
  );
};

export default Footer;
