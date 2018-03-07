import React from "react";
import styled from "styled-components";
import {
  marketCapFormatting,
  currencyFormatting
} from "../../../utils/formatting";
//region StyledComponents
const Table = styled.table`
  /* border: 1px solid blue; */
  height: 90%;
  width: 15%;
  margin: 0.25rem;
  /* padding: 0.25rem; */
`;
const TBody = styled.tbody`
  border: 1px solid red;
`;

const Tr = styled.tr``;
const Th = styled.th`
  border-right: 1px solid rgba(152, 152, 152, 0.2);
  border-bottom: 1px solid rgba(152, 152, 152, 0.2);
  text-align: center;
  width: 40%;
  font-size: 12px;
  padding-right: 0.5rem;
`;
const ThSub = styled.span`
  font-size: 8px;
  opacity: 0.5;
`;
const Td = styled.td`
  padding-left: 0.5rem;
  width: 60%;
  font-size: 12px;
  border-bottom: 1px solid rgba(152, 152, 152, 0.2);
  text-align: center;
`;
//endregion

const Stats = props => {
  const { high_24h, low_24h, open_24h, volume_30d } = props.data;
  const marketCap = props.btcMarketCap;

  if (!props.display) {
    return null;
  }
  return (
    <Table>
      <TBody>
        <Tr>
          <Th>Market Cap</Th>
          <Td>${marketCapFormatting(marketCap)}</Td>
        </Tr>
        <Tr>
          <Th>
            Open <ThSub>(24h)</ThSub>
          </Th>
          <Td>{currencyFormatting(open_24h)}</Td>
        </Tr>
        <Tr>
          <Th>
            High <ThSub>(24h)</ThSub>
          </Th>
          <Td>{currencyFormatting(high_24h)}</Td>
        </Tr>
        <Tr>
          <Th>
            Low <ThSub>(24h)</ThSub>
          </Th>
          <Td>{currencyFormatting(low_24h)}</Td>
        </Tr>
        <Tr>
          <Th>
            Volume <ThSub>(30d)</ThSub>
          </Th>
          <Td>{marketCapFormatting(volume_30d)}</Td>
        </Tr>
      </TBody>
    </Table>
  );
};

export default Stats;
