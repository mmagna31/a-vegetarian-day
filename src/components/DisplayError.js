import React from "react";
import { Button, Modal } from "react-bootstrap";

const DisplayError = ({ display, info, handleClose }) => {
  return (
    <Modal show={display} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>We are sorry! There was an error on request:</p>
        <ul className="list-group">
          <li className="list-group-item">Name: {info.name}</li>
          <li className="list-group-item">Message: {info.message}</li>
          <li className="list-group-item">Code: {info.code}</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DisplayError;
