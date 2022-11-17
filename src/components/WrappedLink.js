import styled from "styled-components";
import { Link } from "react-router-dom";

const WrappedLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    opacity: 0.6;
    color: inherit;
  }
`;

export default WrappedLink;
