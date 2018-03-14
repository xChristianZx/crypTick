import React, { Component } from "react";
import styled from "styled-components";
import TransitionDisplay from "./TransitionDisplay/TransitionDisplay";
import MultiQuote from "./MultiQuote/MultiQuote";
import Loading from "./Loading";
import Header from "../Header/Header";

const QuoteBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: stretch;
  /* DO NOT ADD WIDTH OR HEIGHT AS IT OVERRIDES stretch! */
  padding: 0;
  margin: ${props => (props.loading ? "auto" : "0")};
  flex: 1;
  /* border: 2px solid purple; */ 
`;

class QuoteDisplay extends Component {
  state = {
    count: 0
  };
  componentDidMount() {
    // this.interval = setInterval(this.loopList, 5000);
  }

  loopList = () => {
    if (this.state.count === 2) {
      this.setState({ count: 0 });
    } else {
      this.setState(prevState => ({ count: prevState.count + 1 }));
    }
  };

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  render() {
    const { btcData, ethData, ltcData } = this.props;
    if (!btcData || !ethData || !ltcData) {
      return (
        <QuoteBox loading>
          <Loading />
        </QuoteBox>
      );
    }

    const transitionList = [
      <TransitionDisplay data={btcData} />,
      <TransitionDisplay data={ethData} />,
      <TransitionDisplay data={ltcData} />
    ];

    return (
      <QuoteBox>
        <MultiQuote data={btcData} />
        <MultiQuote data={ethData} />
        <MultiQuote data={ltcData} />
      </QuoteBox>
    );
  }
}

export default QuoteDisplay;
