import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { username: "", password: "", errors: {} };
  }

  handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    await this.setState({
      [name]: value,
    });
    console.log(this.state);
  };

  handleSubmit = async (event) => {
    await this.validateUsername();
    await this.validatePassword();

    event.preventDefault();
  };

  validateUsername = async () => {
    const errors = this.state.errors;
    const username = this.state.username;
    if (username.length === 0) {
      errors.username = "Tên đăng nhập là bắt buộc";
    } else if (username.length < 4 || username.length > 10) {
      errors.username = "Tên đăng nhập cần dài từ 4 đến 10 ký tự";
    }
    //sử dụng regular expression (regex)
    else if (!username.match(/^[A-Za-z0-9]+$/)) {
      errors.username = "Tên đăng nhập chỉ được bao gồm chữ và số";
    }
    console.log(errors.username);
    await this.setState({ errors: { ...this.state.errors, ...errors } });
  };

  validatePassword = async () => {
    const errors = this.state.errors;
    const password = this.state.password;
    if (password.length === 0) {
      errors.password = "Tên đăng nhập là bắt buộc";
    } else if (password.length < 4 || password.length > 10) {
      errors.password = "Tên đăng nhập cần dài từ 4 đến 10 ký tự";
    }
    //sử dụng regular expression (regex)
    else if (!password.match(/^[A-Za-z0-9]+$/)) {
      errors.password = "Tên đăng nhập chỉ được bao gồm chữ và số";
    }
    console.log(errors.password);
    await this.setState({ errors: { ...this.state.errors, ...errors } });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="login">
          <h1>Đăng nhập</h1>
          <div>
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              name="username"
              onChange={this.handleChange}
            ></input>
            <p style={{ color: "red" }}>
              {this.state.errors.username ? this.state.errors.username : null}
            </p>
          </div>
          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              name="password"
              onChange={this.handleChange}
            ></input>
            <p style={{ color: "red" }}>
              {this.state.errors.password ? this.state.errors.password : null}
            </p>
          </div>
          <div>
            <button>Đăng nhập</button>
          </div>
          <div>
            <button type="reset">Reset</button>
          </div>
          <div>
            <button type="button">Đăng nhập bằng Facebook</button>
          </div>
        </div>
      </form>
    );
  }
}
export default Login;
