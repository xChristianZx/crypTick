import React, { Component } from "react";
import styled from "styled-components";
import QuoteDisplay from "../../components/QuoteDisplay/QuoteDisplay";
import Accordion from "../Accordion/Accordion";
import Header from "../../components/Header/Header";

//#region Styled Components
const MainBarWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: center;
  min-height: 7vh;
  height: 100%;
  width: 80vw;
  padding: 0;
  background-color: rgba(53, 60, 63, 1);
  color: white;
  border: 5px solid gray;
`;
const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  /* border: 1px solid green; */
`;
//#endregion

const socket = new WebSocket("ws://localhost:5000");

class MainBar extends Component {
  state = {
    btcWsData: null,
    ethWsData: null,
    ltcWsData: null,
    currentTickerFocus: "BTC-USD",
    dropdownOpen: false
    // currentTicker: 0,
    // wsReadyState: 0
  };

  componentDidMount() {
    socket.onopen = () => {
      const openResponse = JSON.stringify({
        type: "message",
        data: "Client Connected"
      });
      socket.send(openResponse);
    };
    this.wsSetup();
  }

  componentWillUnmount() {
    socket.close();
  }

  wsSetup = () => {
    socket.onmessage = msg => {
      // console.log(msg);
      const data = JSON.parse(msg.data);
      if (data.type === "ticker") {
        if (data.product_id === "BTC-USD") {
          this.setState({ btcWsData: data });
          // console.log("BTC-USD", data);
        } else if (data.product_id === "ETH-USD") {
          this.setState({ ethWsData: data });
          // console.log("ETH-USD", data);
        } else {
          this.setState({ ltcWsData: data });
          // console.log("LTC-USD", data);
        }
      }
      if (data.type === "error") {
        console.log("ERROR: ", data.message);
      }
    };

    socket.onerror = err => {
      console.log("Error: ", err);
      // console.log(socket.readyState);
      // this.setState({ wsReadyState: socket.readyState });
    };

    socket.onclose = msg => {
      console.log(msg);
      // this.setState({ wsReadyState: socket.readyState });
    };

    window.addEventListener("beforeunload", () => {
      socket.close();
    });
  };

  handleClick = (e, id) => {
    // console.log(e, id);
    if (this.state.dropdownOpen && id !== this.state.currentTickerFocus) {
      return this.setState({
        currentTickerFocus: id
      });
    }
    if (this.state.dropdownOpen && id === this.state.currentTickerFocus) {
      return this.setState({ dropdownOpen: false });
    }
    this.setState(prevState => ({
      dropdownOpen: true,
      currentTickerFocus: id
    }));
  };

  //For Header Disconnect
  closeWS = () => {
    socket.close();
  };

  render() {
    const currentWSData = state => {
      if (state === "BTC-USD") {
        return this.state.btcWsData;
      } else if (state === "ETH-USD") {
        return this.state.ethWsData;
      } else {
        return this.state.ltcWsData;
      }
    };
    return (
      <MainBarWrapper>
        <Wrapper>
          <Header closeWS={this.closeWS} />
          <QuoteDisplay
            dropdownOpen={this.handleClick}
            currentTicker={this.state.currentTicker}
            btcData={this.state.btcWsData}
            ethData={this.state.ethWsData}
            ltcData={this.state.ltcWsData}
          />
        </Wrapper>
        <Accordion
          display={this.state.dropdownOpen}
          data={currentWSData(this.state.currentTickerFocus)}
          currentTicker={this.state.currentTickerFocus}
        />
      </MainBarWrapper>
    );
  }
}

export default MainBar;
