import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ProductCard from "./ProductCard";
import "../css/ProductList.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../actions/userAction";

import {
  removeAccentsUpperCase,
  HandleFilter,
  getCurrentTimeString,
} from "../function/functionData";

export default function BoxRegister() {
  let usersDB = useSelector((state) => state.userReducer.users);
  JSON.parse(localStorage.getItem("users")) == null &&
    localStorage.setItem("users", JSON.stringify(usersDB));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(user);

  const [error, setError] = useState({
    isShowStatus: false,
    status: false,
    errorMsg: "",
  });

  // lấy dữ liệu input
  const handleGetInput = async (event) => {
    user[event.target.id] = event.target.value;
    setUser({ ...user });

    await validate(user);
  };

  // handle submit
  const handleSubmit = async (event) => {
    // // Lỗi thì ngưng chạy
    event.preventDefault();
    await validate(user);
    if (error.status) {
      // render lỗi và kết thúc
      await setError({ ...error, isShowStatus: true });
      return;
    } else {
      // render không lỗi
    }

    //  Kiểm tra email đã đăng ký chưa
    let isDulicate = false;
    usersDB.forEach((item) => {
      if (item.email === user.email) {
        isDulicate = true;
      }
    });

    if (isDulicate === false) {
      delete user.confirmPassword;
      user.Fname = "";
      user.Lname = "";
      user.cart = [];
      user.date = getCurrentTimeString();
      user.add = "";
      user.phone = "";
      user.img =
        "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif";

      //   B6: Đẩy dữ liệu lên store

      dispatch(registerUser(user));

      //   Chuyển sang login

      navigate("/login");
    } else {
      await setError({
        ...error,
        isShowStatus: true,
        status: true,
        errorMsg:
          "Email đã tồn tại, vui lòng đăng nhập hoặc đăng ký bằng một email khác",
      });
    }
  };

  // validate data register
  const validate = async (data) => {
    let newError = { ...error }; // Tạo một bản sao của error hiện tại

    if (data.email == "" || data.password == "" || data.confirmPassword == "") {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống";
    } else if (data.password !== data.confirmPassword) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu nhập lại không chính xác";
    } else if (data.password.length < 6) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu không được ngắn hơn 6 ký tự";
    } else if (
      !(
        data.password.match(/[a-z]/) &&
        data.password.match(/[A-Z]/) &&
        data.password.match(/\d/)
      )
    ) {
      newError.status = true;
      newError.errorMsg =
        "Mật khẩu cần bao gồm ký tự IN HOA, chữ thường và chữ số";
    } else {
      newError = { isShowStatus: false, status: false, errorMsg: "" };
    }

    setError(newError); // Cập nhật error
  };

  return (
    <Container style={{ width: "100%", maxWidth: "600px" }}>
      <ul className="nav">
        <li className="nav-item"></li>
        <nav className="set-header">
          <li className="navbar"></li>
          <div id="renderButtonHeader"></div>
        </nav>
      </ul>
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center", padding: "20px" }}>ĐĂNG KÝ</h3>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(event) => handleGetInput(event)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => handleGetInput(event)}
            id="password"
          />
        </div>
        <div className="mb-3">
          <label for="confirmPassword" className="form-label">
            Nhập lại mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => handleGetInput(event)}
            id="confirmPassword"
          />
        </div>
        <h6 style={{ color: "Grey", textAlign: "center" }}>
          Nếu bạn đã có tài khoản, vui lòng
          <Link to="/login">
            <span
              style={{ color: "Black", paddingLeft: "5px", cursor: "pointer" }}
            >
              đăng nhập
            </span>
          </Link>
        </h6>

        {error.isShowStatus == true && error.status == true && (
          <p
            id="Error"
            style={{ color: "#a11515", padding: "20px", textAlign: "center " }}
          >
            {error.errorMsg}
          </p>
        )}
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
  );
}
