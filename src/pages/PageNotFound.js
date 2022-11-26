import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import steamingPot from "../assets/img/steaming_pot.jpg";
import WrappedLink from "../components/WrappedLink";
import Image from "react-bootstrap/Image";
import styled from "styled-components";

const PageNotFound = () => {
  return (
    <Container className="h-100 text-center">
      <h1 className="font-custom display-1 m-3">Oops!</h1>
      <h2 className="lead display-3">
        The page you're looking for does not exist
      </h2>
      {/* <img src={steamingPot} alt="Page not found" className="w-100" /> */}
      <ImageWrapper
        src={steamingPot}
        alt="Page not found"
        fluid
        rounded
        className="my-3"
      />
      <p className="m-2">
        Back to{" "}
        <WrappedLink to="/">
          <Button>Home</Button>
        </WrappedLink>
      </p>
    </Container>
  );
};

export default PageNotFound;

const ImageWrapper = styled(Image)`
  @media screen and (min-width: 768px) {
    width: 40%;
  }
`;
