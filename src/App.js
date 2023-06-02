// import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textInput: "" };
  }

  handlesubbmitForm = (event) => {
    event.preventDefault();
    alert("Bạn vừa nhập '" + this.state.textInput + "'");
  };

  handleChangeInput = (event) => {
    this.setState({ textInput: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handlesubbmitForm}>
        <input type="text" onChange={this.handleChangeInput} />
        <input type="submit" />
      </form>
    );
  }
}
export default App;
