import React from "react";
import styled, { keyframes } from "styled-components";
import { currencyFormatting, numPadding } from "../../../utils/formatting";

// const Wrapper = styled.div`
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   width: 100%;
//   margin: 0.5rem;
//   /* border: 1px solid orange; */
//   background-color: inherit;
// `;
const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  height: 100%;
  width: 20%;
  flex-grow: 1;
  border-right: 5px solid gray;
`;
const Headline = styled.h2`
  background-color: mediumblue;
  padding: 0.5rem;
  margin: 0;
  border-bottom: 5px solid gray;
  text-align: center;
`;
const Content = styled.div`
  background-color: ${props => (props.change > 0 ? "limegreen" : "red")};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  margin: 0;
  /* height: 100%; */
  /* flex-grow: 1; */
  /* flex-basis: auto; */
`;
const QuoteBoxItem = styled.div`
  display: ${props => (props.hide ? "none" : "flex")};
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: white;
  /* border: 1px solid blue; */
`;
const SpotPrice = styled.h1`
  color: white;
  margin: 0;
  /* padding: 0.25rem; */
`;
const PercentageChange = styled.h4`
  color: white;
  margin: 0;
`;
const Label = styled.label`
  color: gray;
  font-size: 1rem;
  font-weight: 600;
`;
const MultiQuote = ({ data }) => {
  const { product_id, price, side, volume_24h, open_24h } = data;
  const percentageChange24H = numPadding((price - open_24h) / open_24h * 100);

  return (
    <Wrapper>
      <Headline children={product_id} />
      <Content>
        <SpotPrice>{currencyFormatting(price)}</SpotPrice>
        <PercentageChange>{percentageChange24H}%</PercentageChange>
      </Content>
    </Wrapper>
  );
};

export default MultiQuote;
