import React from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
      className="m-3"
      onClick={() => navigate(location.state, { state: location.pathname })}
    >
      Back to recipes
    </Button>
  );
};

export default BackButton;
