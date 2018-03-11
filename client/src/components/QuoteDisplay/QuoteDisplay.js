import React, { Component } from "react";
import styled from "styled-components";
import TransitionDisplay from "./TransitionDisplay/TransitionDisplay";
import MultiQuote from "./MultiQuote/MultiQuote";
import Loading from "./Loading";

const QuoteBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${props => (props.loading ? "center" : "space-between")};
  align-items: flex-start;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  /* border: 2px solid purple;
  border-top: none; */
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
        {/* {transitionList[this.state.count]} */}
        <MultiQuote data={btcData} />
        <MultiQuote data={ethData} />
        <MultiQuote data={ltcData} />
      </QuoteBox>
    );
  }
}

export default QuoteDisplay;
