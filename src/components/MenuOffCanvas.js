import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import WrappedLink from "./WrappedLink";
import Logo from "../assets/img/logo_200x200.png";

const MenuOffCanvas = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisible = () => setIsVisible(!isVisible);

  return (
    <Navbar key="md" bg="light" expand="md">
      <Container>
        <WrappedLink to="/">
          <Navbar.Brand>
            <img
              src={Logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt="A Vegetarian Day"
            />{" "}
            <span className="fs-3 font-custom">A Vegetarian Day</span>
          </Navbar.Brand>
        </WrappedLink>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
        <Navbar.Offcanvas
          onShow={() => {
            handleVisible();
          }}
          onHide={() => {
            handleVisible();
          }}
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              className="font-custom fs-1"
              id="offcanvasNavbarLabel-expand-md"
            >
              A Vegetarian Day
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 fs-3 text-black">
              <WrappedLink to="/">What's in my fridge?</WrappedLink>
              <WrappedLink to="/search-recipe">Recipes</WrappedLink>
              <WrappedLink to="/about">About</WrappedLink>
            </Nav>
            {isVisible && (
              <div className="d-flex justify-content-center my-5">
                <img
                  src={Logo}
                  width="150"
                  height="150"
                  className=""
                  alt="A Vegetarian Day"
                />
              </div>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MenuOffCanvas;
