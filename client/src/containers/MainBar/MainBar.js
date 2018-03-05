import React, { Component } from "react";
import styled from "styled-components";
import QuoteDisplay from "../../components/QuoteDisplay/QuoteDisplay";
import FaAngleRight from "react-icons/lib/fa/angle-right";
import Accordion from "../../components/Accordion/Accordion";
import Axios from "axios";

//#region Styled Components
const MainBarWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  align-items: center;
  width: 60vw;
  padding: 0.5rem;
  /* Same as #353C3F */
  background-color: rgba(53, 60, 63, 1);
  border-radius: 5px;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  width: 100%;
  margin: 0.5rem;
  /* border: 2px solid green; */
`;
const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  max-width: 10%;
  border: none;
  height: 2rem;
  width: 2rem;
  font-size: 1.5rem;
  background-color: inherit;
  color: white;
  border-radius: 50%;
  &:focus {
    outline: none;
  }
  & svg {
    transform: ${props => (props.dropdownOpen ? "rotate(90deg)" : -1)};
  }
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
    btcMarketCap: null,
    currentChartData: [],
    currentTicker: 0
  };

  componentDidMount() {
    socket.onopen = () => {
      socket.send(JSON.stringify(heartbeat));
    };
    this.wsSetup();
    this.fetchMarketCap();
    this.fetchHistoricalData();
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
    };

    socket.onclose = msg => {
      console.log(msg);
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
        this.setState({ btcMarketCap: res.data[0].market_cap_usd });
      })
      .catch(err => console.log(err));
  };

  fetchHistoricalData = () => {
    const baseUrl =
      "https://api.gdax.com/products/BTC-USD/candles?granularity=86400";
    // const params = {
    //   granularity: 86400
    // };

    Axios.get(baseUrl)
      .then(res => {
        console.log("Hist Data:", res.data);
        this.setState({ currentChartData: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <MainBarWrapper>
        <Wrapper>
          <DropdownButton
            dropdownOpen={this.props.dropdownOpen}
            onClick={this.props.handleClick}
          >
            <FaAngleRight />
          </DropdownButton>
          <QuoteDisplay
            currentTicker={this.state.currentTicker}
            btcData={this.state.btcWsData}
            ethData={this.state.ethWsData}
            ltcData={this.state.ltcWsData}
          />
          <button onClick={() => socket.close()}>Close</button>
        </Wrapper>
        <Accordion
          display={this.props.dropdownOpen}
          data={this.state.btcWsData}
          btcMarketCap={this.state.btcMarketCap}
          chartData={this.state.currentChartData}
        />
      </MainBarWrapper>
    );
  }
}

export default MainBar;
