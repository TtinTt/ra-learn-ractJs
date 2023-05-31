import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { text: "hello", age: 29 };
  }

  handleClick03() {
    const { text, age } = this.state;
    alert(text + " " + age);
  }

  handleClick(value) {
    alert(value);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleClick("button 01 on clicked")}>
          {" "}
          Button 01
        </button>

        <button onClick={() => this.handleClick("button 02 on clicked")}>
          {" "}
          Button 02
        </button>

        <button onClick={() => this.handleClick03("button 02 on clicked")}>
          {" "}
          Button 03
        </button>
      </div>
    );
  }
}
export default App;
