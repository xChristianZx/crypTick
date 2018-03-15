import React from "react";
import styled from "styled-components";
import {
  marketCapFormatting,
  currencyFormatting,
  volumeFormatting
} from "../../../utils/formatting";
//region StyledComponents
const Container = styled.div`
  /* border: 1px solid white; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 1em 1em 0.25em;
  width: 95%;
  padding: 0.25em;
  flex: 1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`;
const ProdName = styled.h4`
  margin: 0.5em 0;
  padding: 0 1em;
  border-right: 1px solid rgba(255, 255, 255, 0.15);
`;
const Label = styled.label`
  font-size: 0.8em;
`;
const Sub = styled.span`
  font-size: 10px;
  opacity: 0.5;
`;

//endregion

const Stats = props => {
  const { high_24h, low_24h, open_24h, volume_30d, product_id } = props.data;
  const marketCap = props.btcMarketCap;

  if (!props.display) {
    return null;
  }
  return (
    <Container>
      <ProdName>{product_id}</ProdName>
      <Label>Market Cap : {marketCapFormatting(marketCap)}</Label>
      <Label>
        Open <Sub>(24h)</Sub> : {currencyFormatting(open_24h)}
      </Label>
      <Label>
        High <Sub>(24h)</Sub> : {currencyFormatting(high_24h)}
      </Label>
      <Label>
        Low <Sub>(24h)</Sub> : {currencyFormatting(low_24h)}
      </Label>
      <Label>
        Volume <Sub>(30d)</Sub> : {volumeFormatting(volume_30d)}
      </Label>
    </Container>
  );
};

export default Stats;
