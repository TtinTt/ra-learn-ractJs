import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/checklist";
import Table from "react-bootstrap/Table";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      newtodo: { id: 0, value: false, content: "" },
      todo: { id: 0, value: false, content: "test" },
    };
  }

  render() {
    return (
      <div className="App">
        <h3>MINI PROJECT TODO LIST</h3>
        <input placeholder="Thêm công việc"></input>
        <Table striped="columns">
          <thead>
            <tr>
              <th>#</th>
              <th>Nội dung công việc</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <List todo={this.state.todo}></List>
              </td>
              <td>TTT</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
export default App;

{
  /* <input type="checkbox" value="true"></input> */
}
