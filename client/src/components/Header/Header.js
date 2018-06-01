import React from "react";
import styled from "styled-components";

//region StyledComponents
const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;
  height: 100%;
  width: 20%;
  margin: 0;
  flex: 0 1 auto;
  border-right: 5px solid gray;
  /* border: 2px solid purple;  */
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
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: stretch;
  padding: 0.5rem;
  margin: 0;
  @media (max-width: 1140px) {
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
`;
const DTContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  /* border: 1px solid white; */
`;
const StatusContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.25em;
  /* border: 1px solid white; */
`;
const DateTime = styled.h3`
  padding: 0 0.5rem;
  font-size: 1.25em;
  @media (min-width: 1440px) {
    font-size: 1.75em;
  }
`;
const Disconnect = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.25em;
  margin: 0;
  &:hover {
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
`;
const Status = styled.p`
  color: ${props => props.color};
  font-size: 0.25em;
  margin: 0;
`;
//#endregion

const Header = props => {
  const { closeWS, openWS, wsReadyState } = props;

  const date = new Date();
  const timeOptions = { hour: "numeric", minute: "numeric" };
  const dateOptions = { month: "short", day: "numeric" };

  // === Renders the WS connection status === //
  const wsStatus = state => {
    if (state === 0) {
      return (
        <Status color={"white"} title="Websocket Connection Status">
          Connecting
        </Status>
      );
    } else if (state === 1) {
      return (
        <Status
          color={"rgba(50, 205, 50, 0.75)"}
          title="Websocket Connection Status"
        >
          Connected
        </Status>
      );
    } else {
      return (
        <Status color={"red"} title="Websocket Connection Status">
          Disconnected
        </Status>
      );
    }
  };

  // TODO - figure out how to reconnect
  // const connectDisconnectBtn = state => {
  //   if (state === 0 || state === 1) {
  //     return (
  //       <Disconnect
  //         title="Close WebSocket Connection"
  //         onClick={() => closeWS()}
  //       >
  //         Disconnect
  //       </Disconnect>
  //     );
  //   } else {
  //     return (
  //       <Disconnect title="Open WebSocket Connection" onClick={() => openWS()}>
  //         Connect
  //       </Disconnect>
  //     );
  //   }
  // };

  return (
    <Wrapper>
      <Headline children={"CrypTick"} />
      <Content>
        <DTContainer>
          <DateTime>{date.toLocaleDateString("en-us", dateOptions)}</DateTime>
          <DateTime>{date.toLocaleTimeString("en-us", timeOptions)}</DateTime>
        </DTContainer>
        <StatusContainer>
          {wsStatus(wsReadyState)}
          {/* {connectDisconnectBtn(wsReadyState)} */}
          <Disconnect
            title="Close WebSocket Connection"
            onClick={() => closeWS()}
          >
            Disconnect
          </Disconnect>
        </StatusContainer>
      </Content>
    </Wrapper>
  );
};

export default Header;
