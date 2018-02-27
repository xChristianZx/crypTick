import React, { Component } from "react";
import styled from "styled-components";
import QuoteDisplay from "../../components/QuoteDisplay/QuoteDisplay";
import FaAngleRight from "react-icons/lib/fa/angle-right";
import Accordion from "../../components/Accordion/Accordion";

//#region Styled Components
const MainBarWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  align-items: center;
  padding: 0.5rem;
  background-color: #353c3f;
  border-radius: 5px;
  color: white;
  width: 60vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  width: 100%;
  /* padding: 1rem 0; */
  /* border: 2px solid green; */
  /* box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.5); */
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

    socket.onclose = msg => {
      console.log(msg);
    };

    window.addEventListener("beforeunload", () => {
      socket.close();
    });
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
          <QuoteDisplay data={this.state.data} />
          <button onClick={() => socket.close()}>Close</button>
        </Wrapper>
        <Accordion display={this.props.dropdownOpen} />
      </MainBarWrapper>
    );
  }
}

export default MainBar;
