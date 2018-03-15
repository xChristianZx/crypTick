import React from "react";
import styled, { keyframes } from "styled-components";
import { currencyFormatting, numPadding } from "../../../utils/formatting";
//region StyledComponents
const Wrapper = styled.div`
  /* border: 1px solid yellow; */
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-content: stretch;
  align-items: stretch;
  margin: auto;
  flex: 1 1 auto;
  height: 100%;
  width: 20%;
  border-right: 5px solid gray;
  overflow: hidden;
  &:last-child {
    border-right: none;
  }
`;
const slideIn = keyframes`
  0% {
  transform: translateX(-100%)
  }
  100%{
  transform: translateX(0%)
}`;
const HContainer = styled.div`
  border-bottom: 5px solid gray;
  text-align: center;
`;
const Headline = styled.h2`
  background-color: mediumblue;
  margin: 0;
  padding: 0.5rem;
  animation: 1s ${slideIn} ease-in-out;
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
  animation: 1s ${slideIn} ease-in-out;
`;
const SpotPrice = styled.h2`
  color: white;
  padding: 0 0.5em;
  margin: auto;
  font-size: 2em;
`;
const PercentageChange = styled.h3`
  color: white;
  padding: 0 0.5em;
  margin: auto;
  font-size: 1.5em;
`;
//endregion

const MultiQuote = ({ data, dropdownOpen }) => {
  const { product_id, price, open_24h } = data;
  const percentageChange24H = numPadding((price - open_24h) / open_24h * 100);

  return (
    <Wrapper onClick={e => dropdownOpen(e, product_id)}>
      <HContainer>
        <Headline children={product_id} />
      </HContainer>
      <Content>
        <SpotPrice>{currencyFormatting(price)}</SpotPrice>
        <PercentageChange>{percentageChange24H}%</PercentageChange>
      </Content>
    </Wrapper>
  );
};

export default MultiQuote;
