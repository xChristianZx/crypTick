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
const Label = styled.p`
  font-size: 0.7em;
  font-weight: 400;
  margin: 0;
`;
const Nums = styled.span`
  font-size: 1.1rem;
  font-weight: bolder;
`;
const Sub = styled.span`
  font-size: 10px;
  opacity: 0.5;
`;

//endregion

const Stats = props => {
  const { high_24h, low_24h, open_24h, volume_30d, product_id } = props.data;
  const marketCap = props.currentTickerMktCap;

  if (!props.display) {
    return null;
  }
  return (
    <Container>
      <ProdName>{product_id}</ProdName>
      <Label>
        Market Cap : <Nums>{marketCapFormatting(marketCap)}</Nums>
      </Label>
      <Label>
        Open <Sub>(24h)</Sub> : <Nums>{currencyFormatting(open_24h)}</Nums>
      </Label>
      <Label>
        High <Sub>(24h)</Sub> : <Nums>{currencyFormatting(high_24h)}</Nums>
      </Label>
      <Label>
        Low <Sub>(24h)</Sub> : <Nums>{currencyFormatting(low_24h)}</Nums>
      </Label>
      <Label>
        Volume <Sub>(30d)</Sub> : <Nums>{volumeFormatting(volume_30d)}</Nums>
      </Label>
    </Container>
  );
};

export default Stats;
