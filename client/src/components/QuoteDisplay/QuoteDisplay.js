import React from "react";
import styled from "styled-components";
import Arrow from "react-icons/lib/md/arrow-upward";

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
  /* border: 1px solid blue; */
`;

const ProductName = styled.h1`
  /* border-right: 1px solid gray; */
  padding: 0.5rem 1.5rem;
  line-height: 3rem;
`;

const SpotWrapper = QuoteBoxItem.extend`
  flex-flow: row nowrap;
  justify-content: space-evenly;
  width: 12vw;
  & svg.side-indicator {
    font-size: 25px;
    font-weight: 300;
    color: ${props => (props.side === "buy" ? "limegreen" : "red")};
    transform: ${props => (props.side === "sell" ? "rotate(180deg)" : -1)};
  }
`;

const SpotPrice = styled.h1`
  color: white;
  /* border: 1px solid red; */
`;

const PercentageChange = styled.h1`
  color: ${props => (props.change > 0 ? "chartreuse" : "red")};
`;

const Volume = styled.h1``;

const Label = styled.label`
  color: black;
  font-size: 0.75rem;
  font-weight: 400;
`;

const currencyFormatting = num => {
  const usdFormatting = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  return usdFormatting.format(num);
};

const numPadding = num => {
  return Number.parseFloat(num).toFixed(2);
};
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
      <SpotWrapper side={side}>
        <QuoteBoxItem>
          <SpotPrice>{currencyFormatting(price)}</SpotPrice>
          <Label>Last Trade Price</Label>
        </QuoteBoxItem>
        <Arrow className="side-indicator" />
      </SpotWrapper>
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
