import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Changedot, getCurrentTimeString } from "../../function/functionData";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import authApi from "../../apis/auth.api";
import "../../css/Cart.css";
import { loginAdmin } from "../../actions/adminAction";

// import { clearCart } from "../../actions/userAction";
function AdminLoginBox() {
  let admins = useSelector((state) => state.adminReducer.admins);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    isShowStatus: false,
    status: false,
    errorMsg: "",
  });

  // lấy dữ liệu input
  const handleGetInput = async (event) => {
    admin[event.target.id] = event.target.value;
    setAdmin({ ...admin });
    await validate(admin);
  };

  // handle submit
  const handleSubmit = async (event) => {
    // // Lỗi thì ngưng chạy
    event.preventDefault();
    await validate(admin);
    if (error.status) {
      // render lỗi và kết thúc
      await setError({ ...error, isShowStatus: true });
      return;
    } else {
      // render không lỗi
    }

    authApi
      .login(admin.email, admin.password, "admin")
      .then((response) => {
        // dispatch(login(response.token));
        console.log(response);
        window.localStorage.setItem("X-API-Key-Admin", response.token);
        window.location.reload();
      })
      .catch((error) => {
        setError({
          isShowStatus: true,
          status: true,
          errorMsg: "Email không tồn tại hoặc mật khẩu không chính xác",
        });
        console.log(error.response?.statusText);
      });
  };
  // validate data login
  const validate = async (data) => {
    let newError = { ...error }; // Tạo một bản sao của error hiện tại

    if (data.email == "" || data.password == "") {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống";
    } else {
      newError = { isShowStatus: false, status: false, errorMsg: "" };
    }
    setError(newError); // Cập nhật error
  };

  return (
    <>
      {" "}
      <Container style={{ width: "600px" }}>
        <ul className="nav">
          <li className="nav-item"></li>
          <nav className="set-header">
            <li className="navbar"></li>
            <div id="renderButtonHeader"></div>
          </nav>
        </ul>
        <form onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "center", padding: "20px" }}>
            ĐĂNG NHẬP ADMIN
          </h3>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              onChange={(event) => handleGetInput(event)}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Mật khẩu
            </label>
            <input
              onChange={(event) => handleGetInput(event)}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <h6 style={{ color: "Grey", textAlign: "center" }}>
            Nếu bạn chưa có tài khoản, vui lòng liên hệ người quản trị.
          </h6>
          {error.isShowStatus == true && error.status == true && (
            <p
              id="Error"
              style={{
                textAlign: "center ",
                color: "#a11515",
                padding: "20px",
              }}
            >
              {error.errorMsg}
            </p>
          )}{" "}
          <div style={{ textAlign: "center" }}>
            <button
              style={{ display: "inline-block", width: "30%" }}
              type="submit"
              className="btn btn-dark"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </Container>
    </>
    //
  );
}

export default AdminLoginBox;
