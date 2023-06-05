import React from "react";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { username: "", password: "" };
  }

  handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    await this.setState({
      [name]: value,
    });
    console.log(this.state);
  };

  handleSubmit = (event) => {};

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
          </div>
          <div>
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              name="password"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <button>Đăng nhập</button>
          </div>
        </div>
      </form>
    );
  }
}
export default Login;
