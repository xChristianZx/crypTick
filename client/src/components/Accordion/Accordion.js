import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  opacity: ${props => (props.display ? 1 : 0)};
  transition: opacity 0.5s ease-in, height 0.25s linear;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 60vw;
  height: ${props => (props.display ? "40vh" : "0")};
  padding: 1rem;
  background-color: grey;
  border: 1px solid rgb(84, 84, 84);
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.5);
  color: white;
`;

const Accordion = props => {
  return (
    <Wrapper display={props.display}>
      <h1>Hello There</h1>
    </Wrapper>
  );
};

export default Accordion;
