import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { v4 as uuidv4 } from "uuid";
import Badge from "react-bootstrap/Badge";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      newtodo: { id: 0, value: false, content: "", time: "" },
      todo: { content: "" },
      editID: "",
      editContent: "",
      valueSearch: "",
      todoListSearch: [],
    };
  }

  handleChange = async (event) => {
    let inputTodo = {};
    inputTodo.content = event.target.value;
    await this.setState({ todo: inputTodo });
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
    inputTodo.time = [this.handleGettime()];
    await todoListPush.push(inputTodo);
    await this.setState({
      todoList: todoListPush,
    });
    await this.setState({ todo: { content: "" } });
    console.log(inputTodo.id);
  };

  handleChangeEdit = async (event) => {
    await this.setState({ editContent: event.target.value });
  };

  removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  handleChangeSearch = async (event) => {
    await this.setState({ valueSearch: event.target.value });
    let SearchList = [];
    this.state.todoList.forEach((item) => {
      if (
        this.removeAccents(item.content)
          .toUpperCase()
          .includes(this.removeAccents(event.target.value).toUpperCase())
      ) {
        SearchList.push(item);
      }
    });
    this.setState({ todoListSearch: SearchList });
    console.log(SearchList);
  };

  handleSubmitEdit = async (event) => {
    event.preventDefault();
    let EditedList = this.state.todoList;
    await EditedList.forEach((element) => {
      if (element.id == this.state.editID) {
        element.content = this.state.editContent;
      }
    });
    await this.setState({ todoList: EditedList });
    await this.setState({ editID: "", editContent: "" });
  };

  handleTickCheckbox = (event) => {
    let ListUpdate = this.state.todoList;
    ListUpdate.forEach((item, index) => {
      if (item.id == event.target.id) {
        item.value = !item.value;
        if (item.value) {
          item.finishTime = [this.handleGettime()];
        } else {
          item.finishTime = "";
        }
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

  handleShowEdit = (event) => {
    this.setState({ editID: event.target.name });
    this.setState({ editContent: event.target.id });
  };

  render() {
    return (
      <div className="App">
        <h3>
          Mini Project <Badge bg="secondary">TODO LIST</Badge>
        </h3>
        <form onSubmit={this.handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Thêm công việc</InputGroup.Text>
            <Form.Control
              value={this.state.todo.content}
              onChange={this.handleChange}
              aria-label="newtodo"
            />
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
              <th
                style={{
                  position: "relative",
                  top: "-15px",
                  width: "10%",
                }}
              >
                #
              </th>
              <th> </th>
              <th style={{ width: "85%" }}>
                <p
                  style={{
                    float: "left",
                    display: "inline-block",
                    paddingTop: "5px",
                  }}
                >
                  Nội dung công việc
                </p>
                <Form.Control
                  style={{
                    float: "right",
                    display: "inline-block",
                    width: "30%",
                  }}
                  placeholder="Tìm kiếm"
                  // value={this.state.valueSearch}
                  onChange={this.handleChangeSearch}
                  aria-label="newtodo"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.valueSearch === ""
              ? this.state.todoList.map(
                  function (item, index) {
                    return (
                      <tr>
                        <td
                          style={{
                            position: "relative",
                            top: "10px",
                          }}
                        >
                          {index + 1}
                        </td>
                        <td>
                          <Form>
                            <div key={`keytodo`} className="mb-3">
                              <Form.Check
                                type="checkbox"
                                id={this.state.todoList[index].id}
                                onChange={this.handleTickCheckbox}
                                // label={this.state.todoList[index].content}
                                defaultChecked={
                                  this.state.todoList[index].value
                                }
                              />
                            </div>
                          </Form>
                        </td>
                        <td>
                          {item.id === this.state.editID ? (
                            <form onSubmit={this.handleSubmitEdit}>
                              {" "}
                              <InputGroup className="mb-3">
                                <Form.Control
                                  onChange={this.handleChangeEdit}
                                  value={this.state.editContent}
                                  aria-label="newtodo"
                                />
                                <InputGroup.Text
                                  onClick={this.handleSubmitEdit}
                                  type="submit"
                                  id="buttonXN"
                                  name={item.id}
                                >
                                  Xác nhận
                                </InputGroup.Text>
                              </InputGroup>
                            </form>
                          ) : item.value == true ? (
                            <p
                              className="todovalue mb-3 "
                              style={{
                                paddingTop: "9px",
                                paddingBottom: "5px",
                                color: "#858585",
                              }}
                            >
                              <strike>{item.content}</strike>
                              <span
                                style={{
                                  float: "right",
                                  fontSize: "16px",
                                }}
                              >
                                (Hoàn thành {item.finishTime})
                              </span>
                            </p>
                          ) : (
                            <p
                              style={{
                                paddingTop: "9px",
                                paddingBottom: "5px",
                                fontWeight: "600",
                              }}
                              className="todovalue mb-3 "
                            >
                              {item.content}{" "}
                            </p>
                          )}

                          <div className="infoTodo">
                            <Button
                              onClick={this.handleShowEdit}
                              variant="secondary"
                              size="sm"
                              id={item.content}
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
                )
              : this.state.todoListSearch.map(
                  function (item, index) {
                    return (
                      <tr>
                        <td
                          style={{
                            position: "relative",
                            top: "10px",
                          }}
                        >
                          {index + 1}
                        </td>
                        <td>
                          <Form>
                            <div key={`keytodo`} className="mb-3">
                              <Form.Check
                                type="checkbox"
                                id={this.state.todoList[index].id}
                                onChange={this.handleTickCheckbox}
                                // label={this.state.todoList[index].content}
                                defaultChecked={
                                  this.state.todoList[index].value
                                }
                              />
                            </div>
                          </Form>
                        </td>
                        <td>
                          {item.id === this.state.editID ? (
                            <form onSubmit={this.handleSubmitEdit}>
                              {" "}
                              <InputGroup className="mb-3">
                                <Form.Control
                                  onChange={this.handleChangeEdit}
                                  value={this.state.editContent}
                                  aria-label="newtodo"
                                />
                                <InputGroup.Text
                                  onClick={this.handleSubmitEdit}
                                  type="submit"
                                  id="buttonXN"
                                  name={item.id}
                                >
                                  Xác nhận
                                </InputGroup.Text>
                              </InputGroup>
                            </form>
                          ) : item.value == true ? (
                            <p
                              className="todovalue mb-3 "
                              style={{
                                paddingTop: "9px",
                                paddingBottom: "5px",
                                color: "#858585",
                              }}
                            >
                              <strike>{item.content}</strike>
                              <span
                                style={{
                                  float: "right",
                                  fontSize: "12px",
                                }}
                              >
                                (Hoàn thành {item.finishTime})
                              </span>
                            </p>
                          ) : (
                            <p
                              style={{
                                paddingTop: "9px",
                                paddingBottom: "5px",
                                fontWeight: "600",
                              }}
                              className="todovalue mb-3 "
                            >
                              {item.content}{" "}
                            </p>
                          )}

                          <div className="infoTodo">
                            <Button
                              onClick={this.handleShowEdit}
                              variant="secondary"
                              size="sm"
                              id={item.content}
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
