import React from "react";
import styled from "styled-components";

//#region Styled Components
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
  /* border-right: 1px solid gray; */
  padding: 0.5rem 1.5rem;
  line-height: 3rem;
`;
const SpotPrice = styled.h1`
  color: ${data => (data.side === "buy" ? "chartreuse" : "red")};
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
//#endregion

const QuoteDisplay = ({ data }) => {
  if (!data) {
    return (
      <QuoteBox>
        <QuoteBoxItem>
          <h2>Loading...</h2>
        </QuoteBoxItem>
      </QuoteBox>
    );
  }

  const product = data.product_id;
  const price = data.price;
  const side = data.side;
  const change = 0.02;
  const volume = data.volume_24h;

  return (
    <QuoteBox>
      <ProductName>{product}</ProductName>
      <QuoteBoxItem>
        <SpotPrice side={side}>{price}</SpotPrice>
        <Label>Last Trade Price</Label>
      </QuoteBoxItem>
      <QuoteBoxItem>
        <PercentageChange change={change}>
          {change}
          {" %"}
        </PercentageChange>
        <Label>24hr Change</Label>
      </QuoteBoxItem>
      <QuoteBoxItem>
        <Volume>{numPadding(volume)}</Volume>
        <Label>24hr Vol</Label>
      </QuoteBoxItem>
    </QuoteBox>
  );
};

export default QuoteDisplay;
