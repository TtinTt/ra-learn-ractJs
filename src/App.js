import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTime: "",
    };
  }

  render() {
    let datetime = new Date();

    setInterval(function () {
      let datetime = new Date();
    }, 1000);

    return (
      <div>
        <h1>Đồng hồ </h1>
        <h2> {datetime.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default App;
