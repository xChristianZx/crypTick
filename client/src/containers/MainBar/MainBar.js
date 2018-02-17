import React from "react";
import styled from "styled-components";
import QuoteDisplay from "../../components/QuoteDisplay/QuoteDisplay";
import FaAngleRight from "react-icons/lib/fa/angle-right";

//#region Styled Components
const Wrapper = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 60vw;
  height: 7vh;
  padding: 1rem;
  background-color: grey;
  border: 2px solid rgb(84, 84, 84);
  border-radius: 5px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.5);
  color: white;
`;
const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  max-width: 10%;
  border: none;
  height: 2rem;
  width: 2rem;
  font-size: 1.5rem;
  background-color: inherit;
  color: white;
  border-radius: 50%;
  & svg {
    transform: ${props => (props.dropdownOpen ? "rotate(90deg)" : -1)};
  }
`;
//#endregion

const MainBar = ({ dropdownOpen, handleClick }) => {
  return (
    <Wrapper>
      <DropdownButton dropdownOpen={dropdownOpen} onClick={handleClick}>
        <FaAngleRight />
      </DropdownButton>
      <QuoteDisplay />
    </Wrapper>
  );
};

export default MainBar;
