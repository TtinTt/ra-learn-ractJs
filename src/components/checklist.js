import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.todo.value);

    return (
      <tr>
        <td>{this.props.todo.id}</td>
        <td>
          <Form>
            <div key={`keytodo`} className="mb-3">
              <Form.Check // prettier-ignore
                type="checkbox"
                id={this.props.todo.id}
                label={this.props.todo.content}
                defaultChecked={this.props.todo.value}
              />
            </div>
            <div className="infoTodo">
              <Button variant="secondary" size="sm">
                Sửa
              </Button>
              <Button variant="secondary" size="sm">
                Xóa
              </Button>
              <p id="time">{this.props.todo.time}</p>
            </div>
          </Form>
        </td>
      </tr>
    );
  }
}
export default List;
