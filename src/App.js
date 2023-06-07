import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/checklist";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      newtodo: { id: 0, value: false, content: "", time: "" },
      // todo: {
      //   id: 0,
      //   value: true,
      //   content: "Thử nội dung nhiều chữ xem sao nào các bạn ơi",
      //   time: "10:24 12/6/2023",
      // },
    };
  }

  handleChange = (event) => {
    let inputTodo = {};

    inputTodo.content = event.target.value;

    inputTodo.value = false;
    inputTodo.time =
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
    this.setState({ todo: inputTodo });
    console.log(this.state.todo);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let todoListPush = this.state.todoList;
    let inputTodo = this.state.todo;
    if (todoListPush.length == 0) {
      inputTodo.id = 1;
    } else {
      Number((inputTodo.id = todoListPush[todoListPush.length - 1].id + 1));
    }

    await todoListPush.push(inputTodo);
    await this.setState({
      todoList: todoListPush,
    });

    await console.log(this.state.todoList);
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
      if (item.id == event.target.name) {
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
              <th>Nội dung công việc</th>
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
                    <td>{item.id}</td>
                    <td>
                      <Form>
                        <div key={`keytodo`} className="mb-3">
                          <Form.Check
                            type="checkbox"
                            id={item.id}
                            onChange={this.handleTickCheckbox}
                            // label={item.content}
                            defaultChecked={item.value}
                          />
                        </div>
                      </Form>
                    </td>
                    <td>
                      <p className="todovalue">
                        {item.value == true ? (
                          <strike>{item.content}</strike>
                        ) : (
                          item.content
                        )}
                      </p>
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
