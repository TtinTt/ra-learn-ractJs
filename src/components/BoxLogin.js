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
import { loginUser } from "../actions/userAction";
import authApi from "../apis/auth.api";

export default function BoxLogin() {
  // let usersDB = useSelector((state) => state.userReducer.users);
  let userLogined = useSelector((state) => state.userReducer.userLogined);

  // useEffect(() => {
  //   userLogined !== null && navigate("/");
  // }, [usersDB]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [user, setUser] = useState({
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
      // console.log(user);
      authApi
        .login(user.email, user.password, "customer")
        .then((response) => {
          // dispatch(login(response.token));
          console.log(response);
          window.localStorage.setItem("X-API-Key", response.token);
          navigate("/");
        })
        .catch((error) => {
          if (error.response?.status == "406") {
            setError({
              isShowStatus: true,
              status: true,
              errorMsg:
                "Tài khoản bị vô hiệu hóa, vui lòng liên hệ với quản trị viên để biết thêm thông tin.",
            });
          }
          // if (error.response?.status == "401")
          else
            setError({
              isShowStatus: true,
              status: true,
              errorMsg: "Email không tồn tại hoặc mật khẩu không chính xác.",
            });
          console.log(error);
        });
    }
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
    <Container style={{ width: "600px" }}>
      <ul className="nav">
        <li className="nav-item"></li>
        <nav className="set-header">
          <li className="navbar"></li>
          <div id="renderButtonHeader"></div>
        </nav>
      </ul>
      <form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center", padding: "20px" }}>ĐĂNG NHẬP</h3>
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
          <label
            for="password"
            className="form-label"
            style={{
              width: "100%",
            }}
          >
            Mật khẩu{" "}
            <strong
              style={{
                color: "Black",
                paddingLeft: "5px",
                cursor: "pointer",
                float: "right",
              }}
            >
              <Link to="/resetPass">Quên mật khẩu ?</Link>
            </strong>
          </label>
          <input
            onChange={(event) => handleGetInput(event)}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <h6 style={{ color: "Grey", textAlign: "center" }}>
          Nếu bạn chưa có tài khoản, vui lòng
          <Link to="/register">
            <strong
              style={{ color: "Black", paddingLeft: "5px", cursor: "pointer" }}
            >
              đăng ký
            </strong>
            .
          </Link>
        </h6>
        {error.isShowStatus == true && error.status == true && (
          <p
            id="Error"
            style={{ textAlign: "center ", color: "#a11515", padding: "20px" }}
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
  );
}
