import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { inputSearchBox } from "../actions/productAction";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import authApi from "../apis/auth.api";

import Image from "react-bootstrap/Image";
import "../css/Profile.css";
import Modal from "react-bootstrap/Modal";
import { updateInfoUser } from "../actions/userAction";
import userApi from "../apis/user.api";
import {
  prependLocalhost,
  isArrayContainingObjects,
} from "../function/functionData";
import { loginUser } from "../actions/userAction";

function BuyerInfo() {
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  // const [userLogined, setUserLogined] = useState(state.userReducer.userLogined);

  const [isCanEdit, setIsCanEdit] = useState(true);
  const [info, setInfo] = useState({
    user_id: userLogined?.user_id,
    email: userLogined?.email,
    name: userLogined?.name,
    bday: userLogined?.bday,
    // status: userLogined?.status,
    add_address: userLogined?.add_address,
    note: userLogined?.note,
    phone: userLogined?.phone,
    img: userLogined?.img,
  });

  useEffect(() => {
    setInfo({
      ...info,
      user_id: userLogined?.user_id,
      email: userLogined?.email,
      name: userLogined?.name,
      bday: userLogined?.bday,
      // status: userLogined?.status,
      add_address: userLogined?.add_address,
      note: userLogined?.note,
      phone: userLogined?.phone,
      img: userLogined?.img,
    });
  }, [userLogined]);
  // modal
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(new Map());
  const [imgScr, setImgScr] = useState(prependLocalhost(userLogined?.img));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setImgScr(prependLocalhost(userLogined?.img));
  }, [userLogined]);

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   console.log("LOGOUT");
  // };

  // // lấy dữ liệu search
  // const handleGetInput = async (event) => {
  //   dispatch(inputSearchBox(event.target.value));
  // };

  // modal
  const handleChangeinfo = (event) => {
    const newInfo = {
      ...info,
      [event.target.ariaLabel]:
        event.target.ariaLabel == "img"
          ? event.target.files[0] // : event.target.ariaLabel === "name"// ? event.target.value.trim()
          : event.target.value,
    };
    console.log(newInfo);

    setInfo(newInfo);
    // validateInfo(newInfo);
  };

  const handleSaveInfo = () => {
    console.log("info", info);
    setImgScr("");

    const errors = validate(info);
    if (errors.size == 0) {
      const formData = new FormData();

      // if (info.password) {
      //   formData.append("password", info.password);
      // }

      formData.append("add_address", info.add_address);
      formData.append("bday", info.bday);
      formData.append("name", info.name);
      formData.append("note", info.note);
      formData.append("phone", info.phone);
      formData.append("cart", info.cart);

      // formData.append("status", info.status);

      if (info.img) {
        formData.append("img", info.img);
      }
      //
      for (let pair of formData.entries()) {
        console.log("FormData:", pair[0] + ", " + pair[1]);
      }
      //
      userApi
        .updateUser(userLogined?.user_id, formData)
        .then(() => {
          // for (let pair of formData.entries()) {
          //   console.log("FormData2:", pair[0] + ", " + pair[1]);
          // } // navigate('/admin/users');
          // window.location.reload();
          authApi
            .getAuth()
            .then((response) => {
              // let user = { ...response.user, cart: userLogined?.cart };
              // dispatch(loginUser(user));

              dispatch(loginUser(response.user));
              console.log("updateUser", response.user);

              window.location.reload();
              // handleClose();
            })
            .catch((error) => {
              dispatch(loginUser(null));
              localStorage.removeItem("X-API-Key");
              console.log(error.response?.status, error.response?.statusText);
              window.location.reload();
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
    } else {
      setErrors(errors);
      console.log(errors);
    }
  };

  const validate = (user) => {
    const errors = new Map();

    if (
      user.hasOwnProperty("cart") &&
      !user.cart == [] &&
      !isArrayContainingObjects(user.cart)
    ) {
      errors.set("cart", "Giỏ hàng không hợp lệ.");
    }

    // Validate name
    if (user.hasOwnProperty("name") && typeof user.name !== "string") {
      errors.set("name", "Tên phải là chuỗi.");
    } else if (user.first_name && user.first_name.length > 50) {
      errors.set("name", "Tên chỉ cho phép dưới 50 ký tự.");
    }

    // Validate password
    if (
      user.hasOwnProperty("password") &&
      (user.password.length < 6 || user.password.length > 200)
    ) {
      errors.set("password", "Mật khẩu cần có độ dài 6 tới 200 ký tự");
    } else if (
      user.hasOwnProperty("password") &&
      !(
        user.password.match(/[a-z]/) &&
        user.password.match(/[A-Z]/) &&
        user.password.match(/\d/)
      )
    ) {
      errors.set(
        "password",
        "Mật khẩu cần bao gồm ký tự IN HOA, chữ thường và chữ số"
      );
    }

    return errors;
  };

  return (
    <>
      <div className="text-center">
        <h4>Thông tin người dùng</h4>
        <div>
          {imgScr == "" ? null : (
            <img id="user-img" className="text-center" src={imgScr} />
          )}
          <InputGroup id="user-info" className="mb-3 mx-auto">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Email của bạn"
                aria-label="email"
                aria-describedby="basic-addon1"
                type="email"
                value={userLogined?.email}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Tên của bạn"
                aria-label="name"
                aria-describedby="basic-addon1"
                type="text"
                value={userLogined?.name}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Ngày sinh</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Ngày sinh"
                aria-label="bday"
                aria-describedby="basic-addon1"
                type="date"
                value={userLogined?.bday}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Địa chỉ</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Ngày sinh"
                aria-label="add_address"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                value={userLogined?.add_address}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Số điện thoại</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Ngày sinh"
                aria-label="phone"
                aria-describedby="basic-addon1"
                type="number"
                // as="textarea"
                value={userLogined?.phone}
              />
            </InputGroup>
            {/* <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Ảnh đại diện</InputGroup.Text>
              <Form.Control
                disabled
                aria-label="img"
                aria-describedby="basic-addon1"
                type="file"
                name="avatar"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleChangeinfo}
                multiple
              />
             
            </InputGroup> */}
            <div id="groupButton" className="mx-auto">
              <br></br>
              <Button
                style={{ display: "inline-block", marginRight: "10px" }}
                type="submit"
                className="btn btn-light"
                onClick={() => navigate("/changePass")}
              >
                Đổi mật khẩu
              </Button>
              <Button
                style={{ display: "inline-block" }}
                type="submit"
                className="btn btn-dark"
                onClick={handleShow}
              >
                Cập nhật thông tin
              </Button>
            </div>
          </InputGroup>
        </div>
      </div>

      {/* // modal modal modal modal modal modal modal modal modal modal modal modal
      // modal modal modal modal modal modal modal modal modal modal modal modal
      // modal modal modal modal modal modal modal modal modal modal modal modal */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
          <InputGroup id="user-info" className="mb-3 mx-auto">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                // placeholder="Email của bạn"
                disabled
                aria-label="email"
                aria-describedby="basic-addon1"
                type="email"
                value={info.email}
                onChange={handleChangeinfo}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
              <Form.Control
                // placeholder="Tên của bạn"
                aria-label="name"
                aria-describedby="basic-addon1"
                type="text"
                value={info.name}
                onChange={handleChangeinfo}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Ngày sinh</InputGroup.Text>
              <Form.Control
                // placeholder="Ngày sinh"
                aria-label="bday"
                aria-describedby="basic-addon1"
                type="date"
                value={info.bday}
                onChange={handleChangeinfo}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Địa chỉ</InputGroup.Text>
              <Form.Control
                // placeholder="Ngày sinh"
                aria-label="add_address"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                value={info.add_address}
                onChange={handleChangeinfo}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Số điện thoại</InputGroup.Text>
              <Form.Control
                // placeholder="Ngày sinh"
                aria-label="phone"
                aria-describedby="basic-addon1"
                type="number"
                // as="textarea"
                value={info.phone}
                onChange={handleChangeinfo}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Ảnh đại diện</InputGroup.Text>
              <Form.Control
                type="file"
                name="avatar"
                aria-label="img"
                aria-describedby="basic-addon1"
                accept="image/png, image/jpeg, image/gif"
                onChange={handleChangeinfo}
                // multiple
              />
            </InputGroup>

            {/* <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Url ảnh đại diện
              </InputGroup.Text>
              <Form.Control
                // placeholder="Ngày sinh"
                aria-label="img"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                value={
                  info.img ==
                  "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif"
                    ? ""
                    : info.img
                }
                onChange={handleChangeinfo}
              />
            </InputGroup> */}
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="dark" onClick={handleSaveInfo}>
            {" "}
            Lưu thông tin
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BuyerInfo;
