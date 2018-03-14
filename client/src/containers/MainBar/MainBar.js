import React, { Component } from "react";
import styled from "styled-components";
import QuoteDisplay from "../../components/QuoteDisplay/QuoteDisplay";
import FaAngleRight from "react-icons/lib/fa/angle-right";
import Accordion from "../../components/Accordion/Accordion";
import Axios from "axios";
import Header from "../../components/Header/Header";
import MultiQuote from "../../components/QuoteDisplay/MultiQuote/MultiQuote";

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

// const DropdownButton = styled.button`
//   display: flex;
//   align-items: center;
//   max-width: 10%;
//   border: none;
//   height: 2rem;
//   width: 2rem;
//   font-size: 2rem;
//   background-color: inherit;
//   color: white;
//   border-radius: 50%;
//   &:focus {
//     outline: none;
//   }
//   & svg {
//     transform: ${props => (props.dropdownOpen ? "rotate(90deg)" : -1)};
//   }
// `;

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
    currentTicker: 0,
    dropdownOpen: false
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

  handleClick = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  render() {
    return (
      <MainBarWrapper>
        <Wrapper>
          <Header />
          <QuoteDisplay
            dropdownOpen={this.handleClick}
            currentTicker={this.state.currentTicker}
            btcData={this.state.btcWsData}
            ethData={this.state.ethWsData}
            ltcData={this.state.ltcWsData}
          />
        </Wrapper>
        {/* <button onClick={() => socket.close()}>Close</button> */}
        <Accordion
          display={this.state.dropdownOpen}
          data={this.state.btcWsData}
          btcMarketCap={this.state.btcMarketCap}
          chartData={this.state.currentChartData}
        />
      </MainBarWrapper>
    );
  }
}

export default MainBar;
