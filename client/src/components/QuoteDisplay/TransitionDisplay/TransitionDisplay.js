import React from "react";
import styled from "styled-components";
import Arrow from "react-icons/lib/md/arrow-upward";

//#region styled-components
const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  /* border: 1px solid orange; */
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

const SpotPriceWrapper = QuoteBoxItem.extend`
  flex-flow: row nowrap;
  justify-content: space-evenly;
  width: 12vw;
  & svg.side-indicator {
    color: ${props => (props.side === "buy" ? "limegreen" : "red")};
    transform: ${props => (props.side === "sell" ? "rotate(180deg)" : -1)};
    font-size: 25px;
    font-weight: 300;
  }
`;

const SpotPrice = styled.h1`
  color: white;
  margin: 0.25rem;
  /* border: 1px solid red; */
`;

const PercentageChange = SpotPrice.extend`
  color: ${props => (props.change > 0 ? "limegreen" : "red")};
`;

const Volume = SpotPrice.extend``;

const Label = styled.label`
  color: gray;
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

const TransitionDisplay = ({ data }) => {
  const { product_id, price, side, volume_24h, open_24h } = data;
  const change24H = numPadding((price - open_24h) / open_24h * 100);

  return (
    <Wrapper>
      <ProductName>{product_id}</ProductName>
      <SpotPriceWrapper side={side}>
        <QuoteBoxItem>
          <SpotPrice>{currencyFormatting(price)}</SpotPrice>
          <Label>Last Trade Price</Label>
        </QuoteBoxItem>
        <Arrow className="side-indicator" />
      </SpotPriceWrapper>
      <QuoteBoxItem>
        <PercentageChange change={change24H}>
          {change24H}
          {" %"}
        </PercentageChange>
        <Label>24hr Change</Label>
      </QuoteBoxItem>
      <QuoteBoxItem>
        <Volume>{numPadding(volume_24h)}</Volume>
        <Label>24hr Vol</Label>
      </QuoteBoxItem>
    </Wrapper>
  );
};

export default TransitionDisplay;
