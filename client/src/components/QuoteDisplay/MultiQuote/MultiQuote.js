import React from "react";
import styled, { keyframes } from "styled-components";
import { currencyFormatting, numPadding } from "../../../utils/formatting";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-content: stretch;
  align-items: stretch;
  margin: auto;
  flex: 1;
  height: 100%;
  width: 20%;
  border-right: 5px solid gray;
  &:last-child {
    border-right: none;
  }
  /* border: 1px solid yellow; */
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
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.5rem;
  margin: 0;
  height: 100%;
`;
const SpotPrice = styled.h2`
  color: white;
  padding: 0 0.5rem;
  margin: auto;
`;
const PercentageChange = styled.h3`
  color: white;
  padding: 0 0.5rem;
  margin: auto;
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
