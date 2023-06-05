import React from "react";

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Sơn" };
    console.log("constructor đã chạy");
  }
  componentWillMount() {
    console.log("componentWillMount đã chạy");
  }
  handleChangeState = () => {
    this.setState({ name: "Tín" });
  };
  render() {
    console.log("render đã chạy");

    return (
      <div>
        <hr></hr>
        <h3>Child Component</h3>
        <p>Name: {this.state.name}</p>
        <p>Age: {this.props.age}</p>
        <button onClick={this.handleChangeState}>Change state</button>
      </div>
    );
  }

  componentDidMount() {
    console.log("componentDidMount đã chạy");
  }
  shouldComponentUpdate
}
export default Child;
