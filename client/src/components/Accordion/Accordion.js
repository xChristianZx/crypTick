import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: ${props => (props.display ? "40vh" : "0")};
  width: 100%;
  padding: 0;
  opacity: ${props => (props.display ? 1 : 0)};
  transition: opacity 0.5s ease-in, height 0.25s linear;
  background-color: inherit;
  color: white;
  /* border: 1px solid red;   */
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;

const Accordion = props => {
  return (
    <Wrapper display={props.display ? 1 : 0}>
      <h1>Hello There</h1>
    </Wrapper>
  );
};

export default Accordion;
