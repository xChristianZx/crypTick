import React, { Component } from "react";
import styled from "styled-components";
import Axios from "axios";
import HSChart from "../../components/Accordion/Charts/Charts";

class Chart extends Component {
  state = {
    currentTicker: "BTC-USD",
    currentChartData: null
  };

  componentDidMount() {
    this.fetchHistoricalData(this.state.currentTicker);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTicker !== this.state.currentTicker) {
      this.setState({ currentTicker: nextProps.currentTicker });
      this.fetchHistoricalData(nextProps.currentTicker);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.currentTicker !== this.state.currentTicker ||
      nextProps.display !== this.props.display
    );
  }

  fetchHistoricalData = currency => {
    const baseUrl = `https://api.gdax.com/products/${currency}/candles?granularity=86400`;
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
      <HSChart
        chartData={this.state.currentChartData}
        display={this.props.display}
        currentTicker={this.state.currentTicker}
      />
    );
  }
}

export default Chart;
