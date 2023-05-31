import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { studentName: "Trung" };
    this.changeStudentName = this.changeStudentName.bind(this);
  }

  changeStudentName() {
    this.setState({ studentName: "Changed" });
  }

  render() {
    return (
      <div>
        Tên học viên: {this.state.studentName}{" "}
        <button onClick={this.changeStudentName}>Đổi tên</button>
      </div>
    );
  }
}
export default App;
