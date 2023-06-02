import logo from "./logo.svg";
import "./App.css";
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }

  handleCount() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <p>Số lần bấm của bạn là: {this.state.count}</p>
        <button onClick={() => this.handleCount()}>Click</button>
      </div>
    );
  }
}
