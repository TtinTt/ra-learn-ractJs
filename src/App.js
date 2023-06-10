import logo from "./logo.svg";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { time: "" };
  }

  handleTime = () => {
    let thisTime = new Date();
    let hour = thisTime.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    let minite = thisTime.getMinutes();
    if (minite < 10) {
      minite = "0" + minite;
    }
    let sec = thisTime.getSeconds();
    if (sec < 10) {
      sec = "0" + sec;
    }
    this.setState({ time: "Bây giờ là " + hour + ":" + minite + ":" + sec });
  };

  componentWillMount() {
    setInterval(this.handleTime, 1000);
  }

  render() {
    return (
      <div className="App">
        <h1>Xin chào các bạn!</h1>
        <h2>{this.state.time}</h2>
      </div>
    );
  }

  // componentWillUnmount() {}
}

export default App;
