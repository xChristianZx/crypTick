import React from "react";
import styled, { keyframes } from "styled-components";
import Spinner from "react-icons/lib/md/sync";

const spin = keyframes`
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
`;

const QuoteBoxItem = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: white;
  /* border: 1px solid blue; */
`;

const Loader = styled.div`
  animation: ${spin} 1s linear infinite;
  & svg.spinner {
    font-size: 25px;
  }
`;

const Loading = () => {
  return (
    <QuoteBoxItem>
      <Loader>
        <Spinner className="spinner" />
      </Loader>
    </QuoteBoxItem>
  );
};

export default Loading;
