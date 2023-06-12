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
      // todoList: [],
      newtodo: { id: 0, value: false, content: "", time: "" },
      todo: { content: "" },
      editID: "",
      editContent: "",
      deleteID: "",
      valueSearch: "",
      todoListSearch: [],
      loadingValue: "",
      sort: true,
      listRender: [],
      save: true,
    };
  }

  handleRefreshList = async () => {
    if (this.state.valueSearch == "") {
      await this.setState({
        valueSearch: "sort",
      });
      await this.setState({
        valueSearch: "",
      });
    }
  };

  handleSort = async () => {
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
      this.setState({ todoListSearch: SearchList });
    }

    this.handleRefreshList();
    await this.setState({ save: false });
  };

  handleChange = async (event) => {
    let inputTodo = {};
    inputTodo.content = event.target.value;
    await this.setState({ todo: inputTodo });
  };

  handleGettime = () => {
    let thistime = "";
    thistime =
      new Date().toLocaleTimeString("vi-VI", {}) +
      ", " +
      new Date().toLocaleString("vi-VI", {
        // weekday: "narrow",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
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
    this.handleCheckLoading();
    await this.setState({ save: false });
  };

  handleChangeEdit = async (event) => {
    await this.setState({ editContent: event.target.value });
  };

  removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toUpperCase();
  };

  handleChangeSearch = async (event) => {
    await this.setState({ valueSearch: event.target.value });
    let SearchList = [];
    this.state.todoList.forEach((item) => {
      if (
        this.removeAccents(item.content).includes(
          this.removeAccents(this.state.valueSearch)
        )
      ) {
        SearchList.push(item);
      }
    });
    await this.setState({ todoListSearch: SearchList });
    this.handleRefreshList();
  };

  handleSubmitEdit = async (event) => {
    event.preventDefault();
    let EditedList = this.state.todoList;
    EditedList.forEach((element) => {
      if (element.id == this.state.editID) {
        if (this.state.editContent == "") {
          element.content = "Không có nội dung";
        } else {
          element.content = this.state.editContent;
        }
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
    await this.setState({ save: false });
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
  };

  handleTickCheckbox = async (event) => {
    let ListUpdate = this.state.todoList;
    ListUpdate.forEach((item, index) => {
      if (item.id == event.target.id) {
        item.value = !item.value;
        if (item.value == true) {
          item.finishTime = [this.handleGettime()];
          // event.target.style.backgroundColor = "red";
        } else {
          item.finishTime = "";
          // event.target.style.backgroundColor = "blue";
        }
      }
    });
    await this.setState({ todoList: ListUpdate });
    this.handleCheckLoading();
    await this.setState({ save: false });
  };

  handleDelete = async (event) => {
    let ListDelete = this.state.todoList;
    ListDelete.forEach((item, index) => {
      if (item.id === event.target.name) {
        ListDelete.splice(index, 1);
      }
    });

    if (!this.state.valueSearch == "") {
      let ListSearchDelete = this.state.todoListSearch;
      ListSearchDelete.forEach((item, index) => {
        if (item.id === event.target.name) {
          ListSearchDelete.splice(index, 1);
        }
      });
      await this.setState({ todoListSearch: ListSearchDelete });
    }
    await this.setState({ deleteID: "" });
    this.handleCheckLoading();
    await this.setState({ save: false });
  };

  handleSetDeleteID = (event) => {
    this.setState({ deleteID: event.target.name });
  };

  resetDeleteID = () => {
    this.setState({ deleteID: "" });
  };

  handleShowEdit = (event) => {
    this.setState({ editID: event.target.name });
    if (event.target.id == "Không có nội dung") {
      this.setState({ editContent: "" });
    } else {
      this.setState({ editContent: event.target.id });
    }
  };

  handleSave = async () => {
    let stateData = this.state;
    localStorage.setItem("stateData", JSON.stringify(stateData));
    await this.setState({ save: true });
  };

  componentWillMount = async () => {
    let stateData = JSON.parse(localStorage.getItem("stateData"));

    if (stateData == null) {
      await this.setState({ todoList: [] });
    } else {
      await this.setState({ todoList: stateData.todoList });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="topPage">
          <h3>
            Mini Project <Badge bg="secondary">TODO LIST</Badge>
          </h3>
          <form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <label for="newtodo">
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
        </div>
        <main>
          {" "}
          <Table striped="columns">
            <thead>
              <tr>
                <th
                  style={{
                    position: "relative",
                    top: "-9px",
                    width: "3%",
                    fontWeight: "800",
                    color: "#c3c3c3",
                  }}
                >
                  #
                </th>
                <th
                  style={{
                    width: "9%",
                  }}
                >
                  {" "}
                </th>
                <th style={{ width: "85%" }}>
                  <p
                    style={{
                      float: "left",
                      display: "inline-block",
                      paddingTop: "5px",
                      margin: 0,
                      color: "#787878",
                    }}
                  >
                    NỘI DUNG CÔNG VIỆC{" "}
                    <span>
                      {this.state.valueSearch === "" ? (
                        <Button
                          onClick={this.handleSort}
                          variant="secondary"
                          size="sm"
                          style={{
                            position: "relative",
                            top: "-1px",
                            left: "5px",
                          }}
                        >
                          Sắp xếp
                        </Button>
                      ) : null}
                    </span>
                  </p>
                  <Form.Control
                    style={{
                      float: "right",
                      display: "inline-block",
                      width: "30%",
                    }}
                    placeholder="Tìm kiếm"
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
                              top: "6px",
                              color: "#c3c3c3",
                              fontWeight: "600",
                              fontSize: "19px",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td>
                            {this.state.todoList[index].value === false ? (
                              <div
                                onClick={this.handleTickCheckbox}
                                variant="secondary"
                                size="sm"
                                id={this.state.todoList[index].id}
                                className="UncheckDiv"
                              ></div>
                            ) : (
                              <div
                                onClick={this.handleTickCheckbox}
                                variant="secondary"
                                size="sm"
                                id={this.state.todoList[index].id}
                                className="CheckedDiv"
                              ></div>
                            )}
                          </td>
                          <td>
                            {item.id === this.state.editID ? (
                              <form onSubmit={this.handleSubmitEdit}>
                                {" "}
                                <InputGroup className="inputEdit mb-3">
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
                                    Lưu
                                  </InputGroup.Text>
                                </InputGroup>
                              </form>
                            ) : item.value == true ? (
                              <p
                                className="todovalue mb-3 "
                                style={{
                                  paddingTop: "9px",
                                  paddingBottom: "5px",
                                  color: "#8A8A8A",
                                  // letterSpacing: "1px",
                                }}
                              >
                                <strike>{item.content}</strike>
                                <span
                                  style={{
                                    float: "right",
                                    fontSize: "16px",
                                    color: "white",
                                    backgroundColor: "#c3c3c3",
                                    padding: "0 10px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  Hoàn thành {item.finishTime}
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
                              top: "6px",
                              color: "#c3c3c3",
                              fontWeight: "600",
                              fontSize: "19px",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td>
                            {this.state.todoList[index].value === false ? (
                              <div
                                onClick={this.handleTickCheckbox}
                                variant="secondary"
                                size="sm"
                                id={this.state.todoList[index].id}
                                className="UncheckDiv"
                              ></div>
                            ) : (
                              <div
                                onClick={this.handleTickCheckbox}
                                variant="secondary"
                                size="sm"
                                id={this.state.todoList[index].id}
                                className="CheckedDiv"
                              ></div>
                            )}
                          </td>
                          <td>
                            {item.id === this.state.editID ? (
                              <form onSubmit={this.handleSubmitEdit}>
                                {" "}
                                <InputGroup className="inputEdit mb-3">
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
                                    Lưu
                                  </InputGroup.Text>
                                </InputGroup>
                              </form>
                            ) : item.value == true ? (
                              <p
                                className="todovalue mb-3 "
                                style={{
                                  paddingTop: "9px",
                                  paddingBottom: "5px",
                                  color: "#8A8A8A",
                                }}
                              >
                                <strike>{item.content}</strike>
                                <span>Hoàn thành {item.finishTime}</span>
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
        {this.state.save ? (
          <p style={{ color: "#5fbc80", fontSize: "18px" }}>
            {" "}
            Danh sách đã được lưu !
          </p>
        ) : (
          <Button
            style={{ backgroundColor: "#5fbc80", fontSize: "18px", border: 0 }}
            onClick={this.handleSave}
            variant="secondary"
            size="sm"
          >
            Lưu danh sách
          </Button>
        )}
      </div>
    );
  }
}
export default App;
