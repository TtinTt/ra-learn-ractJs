import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

class Button extends React.Component {
  render() {
    return (
      <div>
        <button
          style={{
            color: this.props.color,
            backgroundColor: this.props.background,
          }}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}
export default Button;
