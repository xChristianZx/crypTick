import React from "react";
import styled from "styled-components";
import TransitionDisplay from "./TransitionDisplay/TransitionDisplay";

const QuoteBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${props => (props.loading ? "center" : "space-between")};
  align-items: center;
  /* padding: 0.5rem; */
  width: 100%;
  /* border: 1px solid purple; */
  height: 100%;
`;

const QuoteBoxItem = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: white;
  /* border: 1px solid blue; */
`;

const QuoteDisplay = ({ data }) => {
  if (!data) {
    return (
      <QuoteBox loading>
        <QuoteBoxItem>
          <h2>Loading...</h2>
        </QuoteBoxItem>
      </QuoteBox>
    );
  }
  return (
    <QuoteBox>
      <TransitionDisplay data={data} />
    </QuoteBox>
  );
};

export default QuoteDisplay;
