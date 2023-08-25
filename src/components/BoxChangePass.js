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
import { changePassUser } from "../actions/userAction";
import Modal from "react-bootstrap/Modal";
import authApi from "../apis/auth.api";
import userApi from "../apis/user.api";
import {
  removeAccentsUpperCase,
  HandleFilter,
  getCurrentTimeString,
} from "../function/functionData";
import { loginUser } from "../actions/userAction";
export default function BoxChangePass() {
  let usersDB = useSelector((state) => state.userReducer.users);
  let userLogined = useSelector((state) => state.userReducer.userLogined);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/profile");
  };
  const handleShow = () => setShow(true);

  const [user, setUser] = useState({
    email: userLogined.email,
    oldpassword: "",
    password: "",
    confirmPassword: "",
  });

  // console.log(user);

  const [error, setError] = useState({
    isShowStatus: false,
    status: false,
    errorMsg: "",
  });

  // lấy dữ liệu input
  const handleGetInput = async (event) => {
    user[event.target.id] = event.target.value;
    setUser({ ...user });
    // cần xem lại set user có hợp lý không khi email đang khoá
    await validate(user);
  };

  const changePassByApi = () => {
    const formData = new FormData();
    formData.append("password", user.password);
    userApi
      .updateUser(userLogined.user_id, formData)
      .then(() => {
        authApi
          .getAuth()
          .then((response) => {
            dispatch(loginUser(response));
            console.log(response);
          })
          .catch((error) => {
            dispatch(loginUser(null));
            localStorage.removeItem("X-API-Key");
            console.log(error.response.status, error.response.statusText);
          });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert(error.response.statusText);
          navigate("/login");
        } else {
          alert(error.response.statusText);
        }
      });
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
      delete user.confirmPassword;
      authApi
        .login(user.email, user.oldpassword, "customer")
        .then((response) => {
          // dispatch(login(response.token));
          console.log(response);
          window.localStorage.setItem("X-API-Key", response.token);
          changePassByApi();

          setShow(true);
        })
        .catch((error) => {
          console.log(error.response.statusText);
          let newError = { ...error };
          setError({
            isShowStatus: true,
            status: true,
            errorMsg: "Mật khẩu cũ không chính xác",
          });
        });

      console.log(user);
      // dispatch(changePassUser(user));
    }
  };

  // validate data register
  const validate = async (data) => {
    let newError = { ...error }; // Tạo một bản sao của error hiện tại

    if (
      data.oldpassword == "" ||
      data.password == "" ||
      data.confirmPassword == ""
    ) {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống";
    }
    // else if (data.oldpassword !== userLogined.password) {
    //   newError.status = true;
    //   newError.errorMsg = "Mật khẩu cũ không chính xác";
    // }
    else if (data.oldpassword == data.password) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu mới không được trùng với mật khẩu cũ";
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
        <h3 style={{ textAlign: "center", padding: "20px" }}>ĐỔI MẬT KHẨU</h3>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            disabled
            type="email"
            className="form-control"
            id="email"
            value={userLogined.email}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label for="password" className="form-label">
            Mật khẩu cũ
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(event) => handleGetInput(event)}
            id="oldpassword"
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
          Nếu bạn cần hỗ trợ, vui lòng
          <Link to="/contactUs">
            <span
              style={{ color: "Black", paddingLeft: "5px", cursor: "pointer" }}
            >
              liên hệ với chúng tôi
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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ alignItems: "center" }}
        className="modalCenter"
      >
        <Modal.Header className="modalCenter">
          <h5>Mật khẩu đã được đổi thành công</h5>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px", textAlign: "center" }}>
          Chúng tôi cập nhật mật khẩu mới cho bạn.
        </Modal.Body>
        <Modal.Footer className="modalCenter">
          <Button variant="secondary" onClick={handleClose}>
            Quay lại trang thông tin người dùng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
