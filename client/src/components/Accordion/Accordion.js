import React from "react";
import styled from "styled-components";
import Stats from "./Stats/Stats";
import Charts from "./Charts/Charts";

const Wrapper = styled.section`
  /* border: 1px solid red; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  height: ${props => (props.display ? "50vh" : "0")};
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

const Accordion = props => {
  if (!props.data) {
    return <h2>Loading...</h2>;
  }

  return (
    <Wrapper display={props.display ? 1 : 0}>
      <Stats {...props} />
      <Charts {...props} />
    </Wrapper>
  );
};

export default Accordion;
