import React from "react";
import styled from "styled-components";

//region StyledComponents
const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  /* border: 1px solid green; */
  border-right: 5px solid gray;
  height: 100%;
  flex-grow: 1;
  width: 15%;
`;
const Headline = styled.h2`
  background-color: mediumblue;
  padding: 0.5rem;
  margin: 0;
  border-bottom: 5px solid gray;
  text-align: center;
`;
const Content = styled.div`
  background-color: black;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
  margin: 0;
`;
//#endregion

const Header = props => {
  const date = new Date();
  const timeOptions = { hour: "numeric", minute: "numeric" };
  const dateOptions = { month: "short", day: "numeric" };
  return (
    <Wrapper>
      <Headline children={"CrypTick"} />
      <Content>
        <p>{date.toLocaleDateString("en-us", dateOptions)}</p>
        <p>{date.toLocaleTimeString("en-us", timeOptions)}</p>
      </Content>
    </Wrapper>
  );
};

export default Header;
