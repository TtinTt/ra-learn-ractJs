import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { studentName: "Trung" };
  }

  render() {
    return <div>Tên học viên: {this.state.studentName}</div>;
  }
}
export default App;
