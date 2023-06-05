import "./App.css";
import React from "react";
import Child from "./Child";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { age: 26, isShowChild: true };
    console.log("constructor đã chạy");
    this.handleChangeAge = this.handleChangeAge.bind(this);
  }
  componentWillMount() {
    console.log("componentWillMount đã chạy");
  }
  handleChangeAge() {
    this.setState({ age: 29 });
  }
  handleShowChild() {
    this.setState({
      isShowChild: !this.state.isShowChild,
    });
  }
  render() {
    console.log("render đã chạy");

    return (
      <div>
        <h1>App component</h1>
        <button onClick={this.handleChangeAge}>Change age</button>
        <button onClick={this.handleShowChild.bind(this)}>
          Toggle show child
        </button>
        {this.state.isShowChild ? <Child age={this.state.age} /> : null}
      </div>
    );
  }

  componentDidMount() {
    console.log("componentDidMount đã chạy");
  }
}
export default App;
