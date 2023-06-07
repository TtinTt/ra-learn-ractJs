import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/checklist";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      newtodo: { id: 0, value: false, content: "" },
      todo: {
        id: 0,
        value: true,
        content: "Thử nội dung nhiều chữ xem sao nào các bạn ơi",
        time: "10:24 12/6/2023",
      },
    };
  }

  render() {
    return (
      <div className="App">
        <h3>MINI PROJECT TODO LIST</h3>
        <form>
          <InputGroup className="mb-3">
            <InputGroup.Text>Thêm công việc</InputGroup.Text>
            <Form.Control id="testid" aria-label="newtodo" />
            <InputGroup.Text type="submit" id="buttonXN">
              Xác nhận
            </InputGroup.Text>
          </InputGroup>
        </form>

        <hr></hr>
        <Table striped="columns">
          <thead>
            <tr>
              <th>#</th>
              <th>Nội dung công việc</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <List todo={this.state.todo}></List>
              </td>
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
