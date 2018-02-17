import React from "react";
import styled from "styled-components";

const QuoteDisplay = () => {
  //seedProps
  const props = {
    product: "BTC/USD",
    price: 1000.0,
    change: 0.02,
    volume: 250000
  };
  const QuoteBox = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    width: 90%;
    /* border: 1px solid gray; */
    height: 100%;
  `;
  const QuoteBoxItem = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    color: white;    
  `;
  const ProductName = styled.h1`
    border-right: 1px solid gray;
    padding: 0.5rem 1.5rem;
    line-height: 3rem;
  `;
  const SpotPrice = styled.h1`
    color: ${props => (props.price > 0 ? "chartreuse" : "red")};
  `;
  const PercentageChange = styled.h1`
    color: ${props => (props.change > 0 ? "chartreuse" : "red")};
  `;
  const Volume = styled.h1``;
  const Label = styled.label`
    color: white;
    font-size: 0.5rem;
    font-weight: 400;
  `;
  const numPadding = num => Number.parseFloat(num).toFixed(2);
  return (
    <QuoteBox>
      <ProductName>{props.product}</ProductName>
      <QuoteBoxItem>
        <SpotPrice price={props.price}>{numPadding(props.price)}</SpotPrice>
        <Label>Last Trade Price</Label>
      </QuoteBoxItem>
      <QuoteBoxItem>
        <PercentageChange change={props.change}>
          {props.change}
          {" %"}
        </PercentageChange>
        <Label>24hr Change</Label>
      </QuoteBoxItem>
      <QuoteBoxItem>
        <Volume>{props.volume}</Volume>
        <Label>24hr Vol</Label>
      </QuoteBoxItem>
    </QuoteBox>
  );
};

export default QuoteDisplay;
