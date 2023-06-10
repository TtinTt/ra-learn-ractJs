import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      newtodo: { id: 0, value: false, content: "", time: "" },
      todo: { content: "" },
      editID: "",
      editContent: "",
      deleteID: "",
      valueSearch: "",
      todoListSearch: [],
      loadingValue: "",
      sort: true,
    };
  }
  handleSort = () => {
    let doneList = [];
    let processingList = [];

    this.state.todoList.forEach((item, index) => {
      if (item.value == true) {
        doneList.push(item);
      } else {
        processingList.push(item);
      }
    });

    if (this.state.sort == true) {
      this.setState({
        todoList: processingList.concat(doneList),
        sort: false,
      });
    } else {
      this.setState({
        todoList: doneList.concat(processingList),
        sort: true,
      });
    }
  };

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
    // console.log(inputTodo.id);
    this.handleCheckLoading();
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
    EditedList.forEach((element) => {
      if (element.id == this.state.editID) {
        element.content = this.state.editContent;
      }
    });
    await this.setState({ todoList: EditedList });
    await this.setState({ editID: "", editContent: "" });

    if (!this.state.valueSearch == "") {
      let SearchList = [];
      this.state.todoList.forEach((item) => {
        if (
          this.removeAccents(item.content)
            .toUpperCase()
            .includes(this.removeAccents(this.state.valueSearch).toUpperCase())
        ) {
          SearchList.push(item);
        }
      });

      await this.setState({ todoListSearch: SearchList });
    }
  };

  handleCheckLoading = async () => {
    let count = 0;
    this.state.todoList.forEach((item, index) => {
      if (item.value == true) {
        count = count + 1;
      }
    });

    await this.setState({
      loadingValue: (count / this.state.todoList.length) * 100,
    });
    console.log(this.state.loadingValue);
    // console.log(count);
    // console.log(this.state.todoList.length);
  };

  handleTickCheckbox = (event) => {
    let ListUpdate = this.state.todoList;
    ListUpdate.forEach((item, index) => {
      if (item.id == event.target.id) {
        item.value = !item.value;
        if (item.value == true) {
          item.finishTime = [this.handleGettime()];
        } else {
          item.finishTime = "";
        }
      }
    });
    this.setState({ todoList: ListUpdate });
    this.handleCheckLoading();
  };

  handleDelete = (event) => {
    let ListDelete = this.state.todoList;
    ListDelete.forEach((item, index) => {
      if (item.id === event.target.name) {
        ListDelete.splice(index, 1);
      }
    });
    this.setState({ todoList: ListDelete });

    if (!this.state.valueSearch == "") {
      let ListSearchDelete = this.state.todoListSearch;
      ListSearchDelete.forEach((item, index) => {
        if (item.id === event.target.name) {
          ListSearchDelete.splice(index, 1);
        }
      });
      this.setState({ todoListSearch: ListSearchDelete });
    }

    this.handleCheckLoading();
    console.log(this.state.todoListSearch);
  };

  handleSetDeleteID = (event) => {
    this.setState({ deleteID: event.target.name });
    console.log(this.setState.editID);
  };

  resetDeleteID = () => {
    this.setState({ deleteID: "" });
  };
  handleShowEdit = (event) => {
    this.setState({ editID: event.target.name });
    this.setState({ editContent: event.target.id });
  };

  render() {
    return (
      <div className="App">
        <div className="topPage">
          {" "}
          <h3>
            Mini Project <Badge bg="secondary">TODO LIST</Badge>
          </h3>
          <form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <label for="newtodo">
                {" "}
                <InputGroup.Text>Thêm công việc</InputGroup.Text>
              </label>
              <Form.Control
                value={this.state.todo.content}
                onChange={this.handleChange}
                aria-label="newtodo"
                id="newtodo"
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
          {this.state.loadingValue == 100 ? (
            <Alert key="secondary" variant="secondary">
              Bạn đã hoàn thành tất cả các công việc của mình!
            </Alert>
          ) : (
            <ProgressBar animated now={this.state.loadingValue} />
          )}
          {/* {this.state.loadingValue == 100 ? (
          <Alert key="secondary" variant="secondary">
            Xin chúc mừng, bạn đã hoàn thành tất cả các công việc của mình!
          </Alert>
        ) : null}
        <ProgressBar animated now={this.state.loadingValue} /> */}
          {/* <hr></hr> */}
        </div>
        <main>
          {" "}
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
                    Nội dung công việc{" "}
                    <span>
                      <Button
                        onClick={this.handleSort}
                        variant="secondary"
                        size="sm"
                        style={{
                          position: "relative",
                          top: "-2px",
                          left: "5px",
                        }}
                      >
                        Sắp xếp thứ tự `đang bị lỗi không cập nhật checkbox theo
                        khi sort`
                      </Button>
                    </span>
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
                                    Cập nhật
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

                            {this.state.deleteID == item.id ? (
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
                                  onClick={this.resetDeleteID}
                                  variant="secondary"
                                  size="sm"
                                  // name={item.id}
                                >
                                  Huỷ
                                </Button>

                                <Button
                                  onClick={this.handleDelete}
                                  variant="secondary"
                                  size="sm"
                                  name={item.id}
                                  id="deleteBtn"
                                >
                                  Xác nhận xoá
                                </Button>

                                <p id="time">{item.time}</p>
                              </div>
                            ) : (
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
                                  onClick={this.handleSetDeleteID}
                                  variant="secondary"
                                  size="sm"
                                  name={item.id}
                                >
                                  Xóa
                                </Button>

                                <p id="time">{item.time}</p>
                              </div>
                            )}
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
                                    Cập nhật
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

                            {this.state.deleteID == item.id ? (
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
                                  onClick={this.resetDeleteID}
                                  variant="secondary"
                                  size="sm"
                                  // name={item.id}
                                >
                                  Huỷ
                                </Button>

                                <Button
                                  onClick={this.handleDelete}
                                  variant="secondary"
                                  size="sm"
                                  name={item.id}
                                  id="deleteBtn"
                                >
                                  Xác nhận xoá
                                </Button>

                                <p id="time">{item.time}</p>
                              </div>
                            ) : (
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
                                  onClick={this.handleSetDeleteID}
                                  variant="secondary"
                                  size="sm"
                                  name={item.id}
                                >
                                  Xóa
                                </Button>

                                <p id="time">{item.time}</p>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    }.bind(this)
                  )}
            </tbody>
          </Table>
        </main>
      </div>
    );
  }
}
export default App;

{
  /* <input type="checkbox" value="true"></input> */
}
