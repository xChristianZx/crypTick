import React from "react";
import styled from "styled-components";

const QuoteDisplay = () => {
  const QuoteBox = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0.5rem;
    width: 90%;
    border: 1px solid red;
    height: 100%;
  `;
  return <QuoteBox>Price:</QuoteBox>;
};

export default QuoteDisplay;
