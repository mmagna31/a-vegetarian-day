import React, { useEffect, useRef, useState } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { animateScroll as scroll, Events, scrollSpy } from "react-scroll";
import IngredientCard from "./IngredientCard";
import {
  canScrollToLeft,
  canScrollToRight,
} from "../../utils/elementScrollable";
import styled from "styled-components";

const IngredientsList = ({ ingredients }) => {
  const scrollContainerRef = useRef(null);

  const [isLeftActive, setIsLeftActive] = useState(false);
  const [isRightActive, setIsRightActive] = useState(false);

  const handleScroll = (value) => {
    scroll.scrollMore(value, {
      horizontal: true,
      containerId: "ingredients",
      smooth: "linear",
    });
  };

  const checkControls = () => {
    setIsLeftActive(canScrollToLeft(scrollContainerRef.current));
    setIsRightActive(canScrollToRight(scrollContainerRef.current));
  };

  useEffect(() => {
    /* Assign event to manage controls visibility on the first render */
    Events.scrollEvent.register("end", checkControls);

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("end");
    };
  }, []);

  useEffect(() => {
    checkControls();
  }, [ingredients]);

  return (
    <ScrollWrapper className="fixedWidthMd">
      <ScrollContainer ref={scrollContainerRef} id="ingredients">
        <ul>
          {ingredients.map((ingredient) => {
            const { id } = ingredient;
            return (
              <li key={id}>
                <IngredientCard {...ingredient} />
              </li>
            );
          })}
        </ul>
      </ScrollContainer>
      <Controls>
        {isLeftActive && (
          <button
            onClick={() => {
              handleScroll(-200);
            }}
          >
            <MdOutlineArrowBackIos size={30} />
          </button>
        )}
        {isRightActive && (
          <RightControl>
            <button
              onClick={() => {
                handleScroll(200);
              }}
            >
              <MdOutlineArrowForwardIos size={30} />
            </button>
          </RightControl>
        )}
      </Controls>
    </ScrollWrapper>
  );
};

export default IngredientsList;

const ScrollWrapper = styled.div`
  position: relative;
  height: 120px;
  display: flex;
  & button {
    background-color: transparent;
    border: none;
  }
`;

const ScrollContainer = styled.div`
  overflow: auto;
  white-space: nowrap;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: hidden;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  & li {
    display: inline-block;
    margin-right: 0.5rem;
  }

  & ul {
    padding: 0;
    /* padding-left: 0.5rem; */
  }
`;

const Controls = styled.div`
  width: 100%;
  height: 70%;
  position: absolute;
  display: flex;
  margin-top: 20px;
`;

const RightControl = styled.span`
  width: 100%;
  display: flex;
  justify-content: end;
`;
