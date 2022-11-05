import React from "react";
import { v4 as uuidv4 } from "uuid";

const InstructionsSteps = ({ analyzedInstructions }) => {
  return (
    <>
      <h2 className="font-custom text-center">Instructions</h2>
      <ul>
        {analyzedInstructions[0].steps.map((step) => (
          <li key={uuidv4()}>
            Step {step.number}
            <br />
            {step.step}
          </li>
        ))}
      </ul>
    </>
  );
};

export default InstructionsSteps;
