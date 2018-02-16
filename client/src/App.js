import React, { Component } from "react";
import "./App.css";
import MainBar from "../src/components/MainBar/MainBar";
// import Accordion from "../src/components/Accordion/Accordion";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainBar />
        {/* <Accordion /> */}
      </div>
    );
  }
}

export default App;
