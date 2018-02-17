import React from "react";
import styled from "styled-components";
import QuoteDisplay from "../QuoteDisplay/QuoteDisplay";
import FaAngleRight from "react-icons/lib/fa/angle-right";

const MainBar = () => {
  const Wrapper = styled.section`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 60vw;
    height: 7vh;
    padding: 1rem;
    background-color: darkgray;
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
    /* & svg {
      transform: rotate(90deg);
    } */
  `;
  return (
    <Wrapper>
      <DropdownButton>
        <FaAngleRight />
      </DropdownButton>
      <QuoteDisplay />
    </Wrapper>
  );
};

export default MainBar;
