import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { textInput: "" };
  }

  handleGetInputValue() {
    this.setState({
      number: this.state.number + 1,
    });
  }
  handleAlert() {
    this.setState({
      number: this.state.number + 1,
    });
  }
  render() {
    return (
      <div>
        <input></input>
        {/* <p>{this.state.number}</p> */}
        <button onClick={() => this.handleAlert()}>Submit</button>
      </div>
    );
  }
}
export default App;
