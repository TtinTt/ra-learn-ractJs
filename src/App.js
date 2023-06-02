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
    this.setState;
  };

  render() {
    return (
      <form onSubmit={this.handlesubbmitForm}>
        <input type="text" onChange={this.handleChangeInput} />
        <button type="submit">Add</button>
        <p>Kết quả:</p>
        <p></p>
      </form>
    );
  }
}
export default App;
