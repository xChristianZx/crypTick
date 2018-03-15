import React, { Component } from "react";
import styled from "styled-components";
import Axios from "axios";
import Stats from "../../components/Accordion/Stats/Stats";
import Charts from "../Charts/Charts";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-content: stretch;
  align-items: center;
  height: ${props => (props.display ? "100%" : "0%")};
  /* height: 100%; */
  width: 100%;
  margin: 0;
  /* margin-top: ${props => (props.display ? "1rem" : "0")}; */
  padding: 0;
  opacity: ${props => (props.display ? 1 : 0)};
  transition: opacity 1s ease-in, height .5s ease-in-out;
  background-color: inherit;
  color: white;
  flex: 1;
  border-top: ${props => (props.display ? "5px solid gray" : "none")};
  /* border: 1px solid red; */
`;

class Accordion extends Component {
  state = {
    currentTicker: "BTC-USD",
    currentTickerMktCap: null
  };

  componentDidMount() {
    this.fetchMarketCap(this.state.currentTicker);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTicker !== this.state.currentTicker) {
      this.setState({ currentTicker: nextProps.currentTicker });
      this.fetchMarketCap(nextProps.currentTicker);
    }
  }

  fetchMarketCap = current => {
    let tickerConvert;
    switch (current) {
      case "BTC-USD":
        tickerConvert = "bitcoin";
        break;
      case "ETH-USD":
        tickerConvert = "ethereum";
        break;
      case "LTC-USD":
        tickerConvert = "litecoin";
        break;
      default:
        tickerConvert = "bitcoin";
    }
    // console.log(tickerConvert);

    const baseUrl = `https://api.coinmarketcap.com/v1/ticker/${tickerConvert}/`;

    Axios.get(baseUrl)
      .then(res => {
        // console.log("fetchMarketCap", res);
        this.setState({ currentTickerMktCap: res.data[0].market_cap_usd });
      })
      .catch(err => console.log(err));
  };

  render() {
    const props = this.props;
    if (!props.data) {
      return null;
    }

    return (
      <Wrapper display={props.display ? 1 : 0}>
        <Stats
          currentTicker={this.state.currentTicker}
          currentTickerMktCap={this.state.currentTickerMktCap}
          {...props}
        />
        <Charts {...props} />
      </Wrapper>
    );
  }
}

export default Accordion;
