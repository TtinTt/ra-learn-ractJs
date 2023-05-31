import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { number: 0 };
  }

  inceaseNumber() {
    this.setState({
      number: this.state.number + 1,
    });
  }

  deNumber() {
    this.setState({
      number: this.state.number - 1,
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => this.inceaseNumber()}>Tăng lên 1</button>
        <button onClick={() => this.deNumber()}>Giảm đi 1</button>
      </div>
    );
  }
}
export default App;
