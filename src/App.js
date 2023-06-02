import Button from "./Button";
import "./App.css";
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div>
        <Button text="Click Me" color="red" background="blue" />
      </div>
    );
  }
}
