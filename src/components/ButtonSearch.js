import React from "react";
import { Button } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";

const ButtonSearch = ({ handleSearch, isDisabled }) => {
  return (
    <Button onClick={handleSearch} disabled={isDisabled}>
      <BiSearch />
    </Button>
  );
};

export default ButtonSearch;
