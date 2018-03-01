import React from "react";
import styled from "styled-components";
import { numPadding, marketCapFormatting } from "../../../utils/formatting";
//region StyledComponents
const Table = styled.table`
  /* border: 1px solid blue; */
  height: 50%;
  width: 30%;
  margin: 0.5rem;
`;
const TBody = styled.tbody``;

const Tr = styled.tr`
  margin: 1rem;
`;
const Th = styled.th`
  border-right: 1px solid gray;
  text-align: center;
  width: 40%;
`;
const Td = styled.td`
  /* border-bottom: 1px solid gray; */
  /* border-left: 1px solid gray; */
  padding-left: 0.5rem;
  width: 60%;
`;
//endregion

const Stats = props => {
  const { high_24h, low_24h, open_24h, volume_30d } = props.data;
  const marketCap = props.btcMarketCap;
  return (
    <Table>
      <TBody>
        <Tr>
          <Th>Market Cap</Th>
          <Td>${marketCapFormatting(marketCap)}</Td>
        </Tr>
        <Tr>
          <Th>Open (24h)</Th>
          <Td>{numPadding(open_24h)}</Td>
        </Tr>
        <Tr>
          <Th>High (24h)</Th>
          <Td>{numPadding(high_24h)}</Td>
        </Tr>
        <Tr>
          <Th>Low (24h)</Th>
          <Td>{numPadding(low_24h)}</Td>
        </Tr>
        <Tr>
          <Th>Volume (30d)</Th>
          <Td>{numPadding(volume_30d)}</Td>
        </Tr>
      </TBody>
    </Table>
  );
};

export default Stats;
