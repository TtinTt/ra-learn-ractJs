import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/checklist";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      newtodo: { id: 0, value: false, content: "", time: "" },
    };
  }

  handleChange = async (event) => {
    let inputTodo = {};
    inputTodo.content = event.target.value;
    await this.setState({ todo: inputTodo });
    await console.log(this.state.todo);
  };

  handleGettime = () => {
    let thistime = "";
    thistime =
      new Date().toLocaleTimeString("vi-VI", {
        timeZone: "GMT",
      }) +
      " " +
      new Date().toLocaleString("vi-VI", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: "GMT",
      });
    return thistime;
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let inputTodo = this.state.todo ?? {};
    if (!inputTodo.content) {
      inputTodo.content = "Không có nội dung";
    }
    let todoListPush = this.state.todoList;
    inputTodo.id = uuidv4();
    inputTodo.value = false;
    inputTodo.time = this.handleGettime();
    await todoListPush.push(inputTodo);
    await this.setState({
      todoList: todoListPush,
    });
    this.setState({ todo: {} });
  };
  handleTickCheckbox = (event) => {
    let ListUpdate = this.state.todoList;
    ListUpdate.forEach((item, index) => {
      if (item.id == event.target.id) {
        item.value = !item.value;
      }
    });

    this.setState({ todoList: ListUpdate });
  };
  handleDelete = (event) => {
    let ListDelete = this.state.todoList;
    ListDelete.forEach((item, index) => {
      if (item.id === event.target.name) {
        ListDelete.splice(index, 1);
      }
    });

    this.setState({ todoList: ListDelete });
  };
  handleEdit = () => {
    console.log("a");
  };

  render() {
    return (
      <div className="App">
        <h3>MINI PROJECT TODO LIST</h3>
        <form onSubmit={this.handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Thêm công việc</InputGroup.Text>
            <Form.Control onChange={this.handleChange} aria-label="newtodo" />
            <InputGroup.Text
              onClick={this.handleSubmit}
              type="submit"
              id="buttonXN"
            >
              Xác nhận
            </InputGroup.Text>
          </InputGroup>
        </form>

        <hr></hr>
        <Table striped="columns">
          <thead>
            <tr>
              <th>#</th>
              <th> </th>
              <th style={{ width: "85%" }}>Nội dung công việc</th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.todoList.map(
              function (name, index) {
                return <List todo={name} />;
              }.bind(this)
            )} */}
            {this.state.todoList.map(
              function (item, index) {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Form>
                        <div key={`keytodo`} className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id={this.state.todoList[index].id}
                            onChange={this.handleTickCheckbox}
                            // label={this.state.todoList[index].content}
                            defaultChecked={this.state.todoList[index].value}
                          />
                        </div>
                      </Form>
                    </td>
                    <td>
                      {item.value == true ? (
                        <p className="todovalue" style={{ color: "#858585" }}>
                          {" "}
                          <strike>{item.content}</strike>
                          <span style={{ float: "right", fontSize: "12px" }}>
                            {" "}
                            (Hoàn thành {this.handleGettime()})
                          </span>{" "}
                        </p>
                      ) : (
                        <p className="todovalue">{item.content} </p>
                      )}
                      <div className="infoTodo">
                        <Button
                          onClick={this.handleEdit}
                          variant="secondary"
                          size="sm"
                          name={item.id}
                        >
                          Sửa
                        </Button>
                        <Button
                          onClick={this.handleDelete}
                          variant="secondary"
                          size="sm"
                          name={item.id}
                        >
                          Xóa
                        </Button>
                        <p id="time">{item.time}</p>
                      </div>
                    </td>
                  </tr>
                );
              }.bind(this)
            )}
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
