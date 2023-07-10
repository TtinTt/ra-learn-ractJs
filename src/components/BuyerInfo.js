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

import Image from "react-bootstrap/Image";
import "../css/Profile.css";
import Modal from "react-bootstrap/Modal";
import { updateInfoUser } from "../actions/userAction";

function BuyerInfo() {
  let userLogined = useSelector((state) => state.userReducer.userLogined);

  const [isCanEdit, setIsCanEdit] = useState(true);
  const [info, setInfo] = useState({
    email: userLogined.email,
    name: userLogined.name,
    bday: userLogined.bday,
    status: userLogined.status,
    add: userLogined.add,
    note: userLogined.note,
    phone: userLogined.phone,
    img: userLogined.img,
  });
  // modal
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      [event.target.ariaLabel]: event.target.value,
    };

    setInfo(newInfo);
    // validateInfo(newInfo);
  };

  const handleSaveInfo = () => {
    // console.log(info);
    dispatch(updateInfoUser(info)); // Gửi đơn hàng tới store
    handleClose();
  };

  return (
    <>
      <div className="text-center">
        <h4>Thông tin người dùng</h4>
        <div>
          <img id="user-img" className="text-center" src={userLogined.img} />
          <InputGroup id="user-info" className="mb-3 mx-auto">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Email của bạn"
                aria-label="email"
                aria-describedby="basic-addon1"
                type="email"
                value={userLogined.email}
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
                value={userLogined.name}
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
                value={userLogined.bday}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Địa chỉ</InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Ngày sinh"
                aria-label="add"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                value={userLogined.add}
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
                value={userLogined.phone}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Url ảnh đại diện
              </InputGroup.Text>
              <Form.Control
                disabled
                // placeholder="Ngày sinh"
                aria-label="img"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                value={
                  userLogined.img ==
                  "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif"
                    ? ""
                    : userLogined.img
                }
              />
            </InputGroup>
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
                aria-label="add"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                value={info.add}
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
            </InputGroup>
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
