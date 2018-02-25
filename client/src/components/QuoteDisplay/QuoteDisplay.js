import React from "react";
import styled from "styled-components";
import TransitionDisplay from "./TransitionDisplay/TransitionDisplay";
import Loading from "./Loading";

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

const QuoteDisplay = ({ data }) => {
  if (!data) {
    return (
      <QuoteBox loading>
        <Loading />
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
