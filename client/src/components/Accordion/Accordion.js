import React from "react";
import styled from "styled-components";
import Stats from "./Stats/Stats";
import Charts from "../../containers/Charts/Charts";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-content: stretch;
  align-items: center;
  height: ${props => (props.display ? "100%" : "0%")};
  /* height: 100%; */
  width: 100%;
  margin: 0;
  /* margin-top: ${props => (props.display ? "1rem" : "0")}; */
  padding: 0;
  opacity: ${props => (props.display ? 1 : 0)};
  transition: opacity 1s ease-in, height .5s ease-in-out;
  background-color: inherit;
  color: white;
  flex: 1;
  border-top: ${props => (props.display ? "5px solid gray" : "none")};
  /* border: 1px solid red; */
`;

const Accordion = props => {
  if (!props.data) {
    return null;
  }

  return (
    <Wrapper display={props.display ? 1 : 0}>
      <Stats {...props} />
      <Charts {...props} />
    </Wrapper>
  );
};

export default Accordion;
