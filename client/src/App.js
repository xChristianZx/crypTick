import React, { Component } from "react";
import "./App.css";
import MainBar from "../src/containers/MainBar/MainBar";
import Accordion from "../src/components/Accordion/Accordion";

class App extends Component {
  state = {
    dropdownOpen: false
  };

  handleClick = () => {
    this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
  };

  render() {
    return (
      <div className="App">
        <MainBar
          dropdownOpen={this.state.dropdownOpen}
          handleClick={this.handleClick}
        />
        {this.state.dropdownOpen ? (
          <Accordion display={this.state.dropdownOpen} />
        ) : null}
      </div>
    );
  }
}

export default App;
