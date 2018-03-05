import React, { Component } from "react";
import styled from "styled-components";
import TransitionDisplay from "./TransitionDisplay/TransitionDisplay";
import Loading from "./Loading";

const QuoteBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: ${props => (props.loading ? "center" : "space-between")};
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0.5rem;
  /* border: 1px solid purple; */
`;

class QuoteDisplay extends Component {
  state = {
    count: 0
  };
  componentDidMount() {
    this.interval = setInterval(this.loopList, 5000);
  }

  loopList = () => {
    if (this.state.count === 2) {
      this.setState({ count: 0 });
    } else {
      this.setState(prevState => ({ count: prevState.count + 1 }));
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
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

    return <QuoteBox>{transitionList[this.state.count]}</QuoteBox>;
  }
}

export default QuoteDisplay;
