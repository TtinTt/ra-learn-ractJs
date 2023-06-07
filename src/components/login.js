import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Lắng nghe -> xử lý khi giá trị trong các ô input thay đổi
   * @param {*} event
   */
  async handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    await this.setState({
      [name]: value,
    });
  }

  /**
   * Xử lý khi thực thi đăng nhập
   * @param {*} event
   */
  handleSubmit = async (event) => {
    event.preventDefault();

    await this.validateUsername();
    await this.validatePassword();
  };

  /**
   * Kiểm tra tên đăng nhập
   */
  validateUsername = async () => {
    const errors = {};

    // Validate username
    const username = this.state.username;
    // 1) Bắt buộc nhập
    if (username.length === 0) {
      errors.username = "Tên đăng nhập là bắt buộc";
    }
    // 2) Độ dài: 4 - 10
    else if (username.length < 4 || username.length > 10) {
      errors.username =
        "Độ dài tên đăng nhập chỉ cho phép nhập từ 4 đến 10 ký tự";
    }
    // 3) Chỉ cho xử dụng alphabet numeric -> xử lý regex (regular expression)
    else if (!username.match(/^[A-Za-z0-9]+$/)) {
      errors.username = "Tên đăng nhập chỉ cho phép nhập chữ và số";
    }

    await this.setState({
      errors: {
        ...this.state.errors,
        ...errors,
      },
    });
  };

  /**
   * Kiểm tra password
   */
  validatePassword = async () => {
    const errors = {};

    // Validate password
    const password = this.state.password;
    // 1) Bắt buộc nhập
    if (password.length === 0) {
      errors.password = "Mật khẩu là bắt buộc";
    }
    // 2) Độ dài: 6 - 10
    else if (password.length < 4 || password.length > 10) {
      errors.password = "Độ dài mật khẩu chỉ cho phép nhập từ 4 đến 10 ký tự";
    }
    // 3) Chỉ cho xử dụng alphabet numeric -> xử lý regex (regular expression)
    else if (!password.match(/^[A-Za-z0-9]+$/)) {
      errors.password = "Mật khẩu chỉ cho phép nhập chữ và số";
    }

    await this.setState({
      errors: {
        ...this.state.errors,
        ...errors,
      },
    });
  };

  render() {
    return (
      <div className="login">
        <h1>Đăng nhập</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              name="username"
              onChange={this.handleChange}
            />
            {this.state.errors.username && (
              <p style={{ color: "red" }}>{this.state.errors.username}</p>
            )}
          </div>
          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              name="password"
              onChange={this.handleChange}
            />
            {this.state.errors.password && (
              <p style={{ color: "red" }}>{this.state.errors.password}</p>
            )}
          </div>
          <div>
            <button>Đăng nhập</button>
            <button type="reset">Reset input</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
