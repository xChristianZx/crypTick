import React, { Component } from "react";
import styled from "styled-components";
import QuoteDisplay from "../../components/QuoteDisplay/QuoteDisplay";
import Accordion from "../../components/Accordion/Accordion";
import Axios from "axios";
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

const socket = new WebSocket("wss://ws-feed.gdax.com");
const heartbeat = {
  type: "subscribe",
  product_ids: ["BTC-USD", "ETH-USD", "LTC-USD"],
  channels: ["heartbeat", "ticker"]
};

class MainBar extends Component {
  state = {
    btcWsData: null,
    ethWsData: null,
    ltcWsData: null,
    currentTickerMktCap: null,
    // currentTicker: 0,
    currentTickerFocus: "BTC-USD",
    dropdownOpen: false
    // wsReadyState: 0
  };

  componentDidMount() {
    socket.onopen = () => {
      socket.send(JSON.stringify(heartbeat));
    };
    this.wsSetup();
    this.fetchMarketCap();
  }

  componentWillUnmount() {
    socket.close();
  }

  wsSetup = () => {
    socket.onmessage = msg => {
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

  fetchMarketCap = () => {
    const baseUrl = "https://api.coinmarketcap.com/v1/ticker/bitcoin/";

    Axios.get(baseUrl)
      .then(res => {
        console.log("fetchMarketCap", res);
        this.setState({ currentTickerMktCap: res.data[0].market_cap_usd });
      })
      .catch(err => console.log(err));
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
    // console.log(this.state.currentTickerFocus);
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
          data={this.state.btcWsData}
          currentTickerMktCap={this.state.currentTickerMktCap}
          currentTicker={this.state.currentTickerFocus}
        />
      </MainBarWrapper>
    );
  }
}

export default MainBar;
