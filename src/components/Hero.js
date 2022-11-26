import React from "react";
import styled from "styled-components";

/**
 * Componente Hero a cui è possibile impostare una img di background e
 * abilitare una maschera passandogli i valori rgba
 * */

const Hero = ({
  children,
  img = null,
  mask = false,
  maskRgba = "rgba(0, 0, 0, 0.5)",
}) => {
  return (
    <Wrapper>
      {img && <BackgroundImg src={img} alt="hero img" />}
      {mask && <Mask rgba={maskRgba} />}
      <WrapperChildren>{children}</WrapperChildren>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.div`
  position: relative;
`;

const BackgroundImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  overflow: hidden;
  background-attachment: fixed;
  background-color: ${(props) => props.rgba};
`;

const WrapperChildren = styled.div`
  position: relative;
`;
