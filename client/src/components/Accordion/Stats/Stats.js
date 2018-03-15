import React from "react";
import styled from "styled-components";
import {
  marketCapFormatting,
  currencyFormatting
} from "../../../utils/formatting";
//region StyledComponents
const Container = styled.div`
  border: 1px solid white;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  margin-right: 1rem;
  padding: 0.25em;
  /* width: 30%; */
  flex: 1;
`;

const Table = styled.table`
  table-layout: fixed;
  border: 1px solid blue;
  border-collapse: collapse;
  /* height: 90%; */
  width: 100%;
  margin: auto;
  padding: 0.5rem;
`;
const TBody = styled.tbody``;
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
  const { high_24h, low_24h, open_24h, volume_30d, product_id } = props.data;
  const marketCap = props.btcMarketCap;

  if (!props.display) {
    return null;
  }
  return (
    <Container>
      <Table>
        <caption>{product_id}</caption>
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
    </Container>
  );
};

export default Stats;
