import logo from "./logo.svg";
import React from "react";
import "./App.css";

let a = 3;
let b = 4;
let c = a + b;
const text = "Tổng của " + a + " và " + b + " là " + c;

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>{text}</h1>
      </div>
    );
  }
}

export default App;
