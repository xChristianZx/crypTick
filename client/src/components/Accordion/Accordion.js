import React from "react";
import styled from "styled-components";

const Accordion = props => {
  const Wrapper = styled.section`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 60vw;
    height: 40vh;
    padding: 1rem;
    background-color: grey;
    border: 1px solid rgb(84, 84, 84);
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.5);
    color: white;
  `;
  return <Wrapper />;
};

export default Accordion;
