import React from "react";
import { ListGroup } from "react-bootstrap";
import IngredientItem from "./IngredientItem";
import { Scrollbars } from "react-custom-scrollbars-2";
import styled from "styled-components";

const HintsList = ({ hints, handleClick }) => {
  return (
    <WrapperList className="fixedWidthMd">
      {hints.length > 0 && (
        <List>
          <Scrollbars
            style={{ width: "100%", height: 200 }}
            className="rounded border"
          >
            {hints.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                {...ingredient}
                handleClick={() => {
                  handleClick(ingredient);
                }}
              />
            ))}
          </Scrollbars>
        </List>
      )}
    </WrapperList>
  );
};

export default HintsList;

const WrapperList = styled.div`
  position: relative;
`;

const List = styled(ListGroup)`
  position: absolute;
  width: 100%;
  z-index: 1;
`;
