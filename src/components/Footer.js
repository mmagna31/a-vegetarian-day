import React from "react";
import { Container } from "react-bootstrap";
import Logo from "../assets/img/logo_secondary.png";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <Container className="text-center bg-primary p-3" fluid>
        <img
          src={Logo}
          width="35"
          height="35"
          className="d-inline-block align-top"
          alt="A Vegetarian Day"
        />{" "}
        <span className="d-block font-custom text-secondary">
          A vegetarian Day
        </span>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  margin-top: auto;
`;
