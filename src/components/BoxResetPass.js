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
import { resetPassUser } from "../actions/userAction";
import Modal from "react-bootstrap/Modal";
import authApi from "../apis/auth.api";
import userApi from "../apis/user.api";
import {
  removeAccentsUpperCase,
  HandleFilter,
  getCurrentTimeString,
} from "../function/functionData";
import { loginUser } from "../actions/userAction";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function BoxResetPass() {
  let usersDB = useSelector((state) => state.userReducer.users);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/login");
  };
  const handleShow = () => setShow(true);

  const [user, setUser] = useState({
    email: "",
    codeResetPass: "",
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

  const resetPassByApi = () => {
    const formData = new FormData();
    formData.append("password", user.password);
    userApi
      .updateUser(user?.user_id, formData)
      .then(() => {
        authApi
          .getAuth()
          .then((response) => {
            // dispatch(loginUser(response));
            console.log(response);
          })
          .catch((error) => {
            dispatch(loginUser(null));
            localStorage.removeItem("X-API-Key");
            console.log(error.response?.status, error.response?.statusText);
          });
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log(error.response?.statusText);
          navigate("/login");
        } else {
          console.log(error.response?.statusText);
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
      delete user.password;
      userApi
        .resetPass(user.email, user.codeResetPass, user.confirmPassword)
        .then((response) => {
          // dispatch(login(response.token));
          console.log(response);
          // window.localStorage.setItem("X-API-Key", response.token);
          // resetPassByApi();
          setShow(true);
        })
        .catch((error) => {
          console.log(error);
          setError({
            isShowStatus: true,
            status: true,
            errorMsg:
              "Tài khoản không tồn tại hoặc mã xác minh không chính xác",
          });
        });

      console.log(user);
      // dispatch(resetPassUser(user));
    }
  };
  // handle submit check email available
  const handleSubmitCheckEmail = async (event) => {
    // // Lỗi thì ngưng chạy
    event.preventDefault();
    await validateEmail(user);

    if (error.status) {
      // render lỗi và kết thúc
      await setError({ ...error, isShowStatus: true });
      return;
    } else {
      setIsCheckedEmail(true);
      // render không lỗi
      userApi
        .sendCodeResetPass(user.email)
        .then((response) => {
          // dispatch(login(response.token));
          console.log(response);
          // resetPassByApi();
        })
        .catch((error) => {
          console.log(error);
          // let newError = { ...error };
          // setError({
          //   isShowStatus: true,
          //   status: true,
          //   errorMsg: "Mật khẩu cũ không chính xác",
          // });
        });

      console.log(user);
      // dispatch(resetPassUser(user));
    }
  };
  useEffect(() => {
    console.log(user);
  }, [user]);

  // validate data email
  const validateEmail = async (data) => {
    let newError = { ...error }; // Tạo một bản sao của error hiện tại
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (data.email == "") {
      newError.status = true;
      newError.errorMsg = "Email không được để trống";
    } else if (!regex.test(data.email)) {
      newError.status = true;
      newError.errorMsg = "Email không hợp lệ";
    } else {
      newError = { isShowStatus: false, status: false, errorMsg: "" };
    }

    setError(newError); // Cập nhật error
  };

  // validate data register
  const validate = async (data) => {
    let newError = { ...error }; // Tạo một bản sao của error hiện tại

    if (
      data.codeResetPass == "" ||
      data.password == "" ||
      data.confirmPassword == ""
    ) {
      newError.status = true;
      newError.errorMsg = "Các thông tin không được để trống";
    }
    // else if (data.codeResetPass !== user?.password) {
    //   newError.status = true;
    //   newError.errorMsg = "Mật khẩu cũ không chính xác";
    // }
    else if (data.codeResetPass == data.password) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu mới không được trùng với mã xác minh";
    } else if (data.password !== data.confirmPassword) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu nhập lại không chính xác";
    } else if (data.password.length < 6) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu không được ngắn hơn 6 ký tự";
    } else if (data.password.length > 200) {
      newError.status = true;
      newError.errorMsg = "Mật khẩu không được dài quá 200 ký tự";
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

      {isCheckedEmail && (
        <form onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "center", padding: "20px" }}>
            ĐẶT LẠI MẬT KHẨU
          </h3>
          {/* <div className="mb-3">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              disabled
              type="email"
              className="form-control"
              id="email"
              value={user?.email}
              aria-describedby="emailHelp"
            />
          </div> */}
          <p>
            Nếu email <strong>{user?.email}</strong> khớp với một tài khoản đã
            đăng ký, bạn sẽ nhận được một <strong>mã xác minh</strong> để đặt
            lại mật khẩu, mã chỉ có hiệu lực trong vòng 5 phút.
          </p>
          <hr></hr>

          <div className="mb-3">
            <label
              style={{
                width: "100%",
              }}
              for="codeResetPass"
              className="form-label"
            >
              Mã xác nhận
              <strong
                style={{
                  color: "Black",
                  paddingLeft: "5px",
                  cursor: "pointer",
                  float: "right",
                }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Không nhận được mã ?
              </strong>
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => handleGetInput(event)}
              id="codeResetPass"
            />
          </div>

          <div className="mb-3">
            <label for="password" className="form-label">
              Mật khẩu mới
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
                style={{
                  color: "Black",
                  paddingLeft: "5px",
                  cursor: "pointer",
                }}
              >
                liên hệ với chúng tôi.
              </span>
            </Link>
          </h6>

          {error.isShowStatus == true && error.status == true && (
            <p
              id="Error"
              style={{
                color: "#a11515",
                padding: "20px",
                textAlign: "center ",
              }}
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
      )}

      {!isCheckedEmail && (
        <form onSubmit={handleSubmitCheckEmail}>
          <h3 style={{ textAlign: "center", padding: "20px" }}>
            ĐẶT LẠI MẬT KHẨU
          </h3>{" "}
          <div className="mb-3">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={user?.email}
              aria-describedby="emailHelp"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          {/* <hr></hr> */}
          <p style={{ textAlign: "center" }}>
            Nếu email của bạn khớp với một tài khoản đã đăng ký, bạn sẽ nhận
            được một <strong>mã xác minh</strong> để đặt lại mật khẩu, mã chỉ có
            hiệu lực trong vòng 5 phút.
          </p>
          <h6 style={{ color: "Grey", textAlign: "center" }}>
            Nếu bạn cần hỗ trợ, vui lòng
            <Link to="/contactUs">
              <span
                style={{
                  color: "Black",
                  paddingLeft: "5px",
                  cursor: "pointer",
                }}
              >
                liên hệ với chúng tôi.
              </span>
            </Link>
          </h6>
          {error.isShowStatus == true && error.status == true && (
            <p
              id="Error"
              style={{
                color: "#a11515",
                padding: "20px",
                textAlign: "center ",
              }}
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
      )}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ alignItems: "center" }}
        className="modalCenter"
      >
        <Modal.Header className="modalCenter">
          <h5>Mật khẩu đã được đặt lại thành công</h5>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px", textAlign: "center" }}>
          Hãy đăng nhập bằng mật khẩu mới.
        </Modal.Body>
        <Modal.Footer className="modalCenter">
          <Button variant="secondary" onClick={handleClose}>
            Quay lại trang đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
