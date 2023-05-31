import logo from "./logo.svg";
import "./App.css";
import React from "react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Xin chào {this.props.studenName}!</p>
        <p>Chào mừng {this.props.studenName} đến với trang này.</p>
      </div>
    );
  }
}

export default MyComponent;
