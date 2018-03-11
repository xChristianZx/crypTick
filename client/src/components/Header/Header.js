import React from "react";
import styled from "styled-components";

//region StyledComponents
const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  height: 100%;
  width: 20%;
  flex-grow: 1;
  border-right: 5px solid gray;
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
  padding: 0.25rem 0.5rem;
  margin: 0;
`;
const DateTime = styled.h4`
  padding: 0 0.5rem;
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
        <DateTime>{date.toLocaleDateString("en-us", dateOptions)}</DateTime>
        <DateTime>{date.toLocaleTimeString("en-us", timeOptions)}</DateTime>
      </Content>
    </Wrapper>
  );
};

export default Header;
