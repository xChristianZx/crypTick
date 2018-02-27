import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* border: 1px solid orange; */
  height: 100%;
`;

const MultiQuote = ({ data }) => {
  const { product_id, price, side, volume_24h } = data;
  const change = 0.02;

  return <Wrapper>Multiple quotes here</Wrapper>;
};

export default MultiQuote;
