import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>MINI PROJECT TODO LIST</h1>
        <input placeholder="Thêm công việc"></input>
        <input type="checkbox"></input>
      </div>
    );
  }
}
export default App;
