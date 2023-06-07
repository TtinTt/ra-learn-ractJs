import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

class List extends React.Component {
  render() {
    return (
      <div>
        <Form>
          {["checkbox"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check // prettier-ignore
                type={type}
                id={`default-${type}`}
                label={`default ${type}`}
              />
            </div>
          ))}
        </Form>
      </div>
    );
  }
}
export default List;
