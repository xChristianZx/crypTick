import React from "react";
import styled from "styled-components";
import TransitionDisplay from "./TransitionDisplay/TransitionDisplay";
import Loading from "./Loading";

const QuoteBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${props => (props.loading ? "center" : "space-between")};
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0.5rem 0;
  /* border: 1px solid purple; */
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
