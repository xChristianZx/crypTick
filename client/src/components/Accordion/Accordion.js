import React from "react";
import styled from "styled-components";
import Stats from "./Stats/Stats";

const Wrapper = styled.section`
  /* border: 1px solid red; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
  height: ${props => (props.display ? "40vh" : "0")};
  width: 100%;
  padding: 0 0.25rem;
  opacity: ${props => (props.display ? 1 : 0)};
  transition: opacity 0.5s ease-in, height 0.25s linear;
  background-color: inherit;
  color: white;
  border-top: 1px solid rgba(64, 72, 76, 0.75);
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
`;
const ChartHolder = styled.div`
  /* border: 1px solid green; */
  height: 50%;
  width: 70%;
  margin: 0.5rem;
`;

const Accordion = props => {
  if (!props.data) {
    return <h2>Loading... </h2>;
  }

  return (
    <Wrapper display={props.display ? 1 : 0}>
      <Stats {...props} />
      <ChartHolder children={<h1>chart here</h1>} />
    </Wrapper>
  );
};

export default Accordion;
