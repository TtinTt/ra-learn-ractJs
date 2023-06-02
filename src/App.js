// import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0, array: [], total: 0 };
  }

  handleChangeInput = (event) => {
    this.setState({ number: event.target.value });
  };

  handlesubbmitForm = (event) => {
    event.preventDefault();
    this.setState({
      array: [...this.state.array, this.state.number],
      total: Number(this.state.total) + Number(this.state.number),
      number: 0,
    });
    console.log(this.state.array);
  };

  render() {
    return (
      <form onSubmit={this.handlesubbmitForm}>
        <input
          type="number"
          onChange={this.handleChangeInput}
          value={this.state.number}
        />
        <button type="submit">Add</button>
        <p>Kết quả:</p>
        <p style={{ color: "red" }}>
          {this.state.array.join("+") + "=" + this.state.total}
        </p>
      </form>
    );
  }
}
export default App;
