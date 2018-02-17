import React, { Component } from "react";
import styled from "styled-components";
import QuoteDisplay from "../../components/QuoteDisplay/QuoteDisplay";
import FaAngleRight from "react-icons/lib/fa/angle-right";

//#region Styled Components
const Wrapper = styled.section`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 60vw;
  height: 7vh;
  padding: 1rem;
  background-color: grey;
  border: 2px solid rgb(84, 84, 84);
  border-radius: 5px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.5);
  color: white;
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
  & svg {
    transform: ${props => (props.dropdownOpen ? "rotate(90deg)" : -1)};
  }
`;
//#endregion
const socket = new WebSocket("wss://ws-feed.gdax.com");
const heartbeat = {
  type: "subscribe",
  product_ids: ["BTC-USD"],
  channels: ["heartbeat", "ticker"]
};

class MainBar extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    socket.onopen = () => {
      socket.send(JSON.stringify(heartbeat));
    };
    this.wsSetup();
  }

  componentWillUnmount() {
    socket.close();
    socket.onclose = msg => {
      console.log(msg);
    };
  }

  wsSetup = () => {
    socket.onmessage = msg => {
      const data = JSON.parse(msg.data);
      if (data.type === "ticker") {
        console.log(data);
        this.setState({ data });
      }
      if (data.type === "error") {
        console.log("ERROR: ", data.message);
      }
    };

    socket.onerror = err => {
      console.log("Error: ", err);
    };
  };

  render() {
    return (
      <Wrapper>
        <DropdownButton
          dropdownOpen={this.props.dropdownOpen}
          onClick={this.props.handleClick}
        >
          <FaAngleRight />
        </DropdownButton>
        <QuoteDisplay data={this.state.data} />
      </Wrapper>
    );
  }
}

export default MainBar;
