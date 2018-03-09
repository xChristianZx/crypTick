import React from "react";
import styled, { keyframes } from "styled-components";
import { currencyFormatting, numPadding } from "../../../utils/formatting";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0.5rem;
  /* border: 1px solid orange; */
  background-color: inherit;
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
  margin: 0.25rem;
  /* padding: 0.25rem; */
`;
const PercentageChange = SpotPrice.extend`
  color: ${props => (props.change > 0 ? "limegreen" : "red")};
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
      <QuoteBoxItem>
        <SpotPrice>{currencyFormatting(price)}</SpotPrice>
        <Label>{product_id}</Label>
      </QuoteBoxItem>
      <QuoteBoxItem hide>
        <PercentageChange change={percentageChange24H}>
          {percentageChange24H > 0 ? "+" : null}
          {percentageChange24H}
          {" %"}
        </PercentageChange>
        <Label>24hr Change</Label>
      </QuoteBoxItem>
    </Wrapper>
  );
};

export default MultiQuote;
