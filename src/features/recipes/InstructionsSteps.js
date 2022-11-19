import React from "react";
import { ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import TitleSection from "../../components/TitleSection";

const InstructionsSteps = ({ analyzedInstructions }) => {
  return (
    <>
      <TitleSection>Instructions</TitleSection>
      <ListGroup className="text-center">
        {analyzedInstructions[0].steps.map((step) => (
          <ListGroup.Item className="border-0" key={uuidv4()}>
            <span className="text-muted fw-light">Step {step.number}</span>
            <br />
            {step.step}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default InstructionsSteps;
