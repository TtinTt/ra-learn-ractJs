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
import Image from "react-bootstrap/Image";
import "../css/Profile.css";
import Modal from "react-bootstrap/Modal";
import { updateInfoUser } from "../actions/userAction";

function ContactUs() {
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  const [isCanEdit, setIsCanEdit] = useState(true);
  const [info, setInfo] = useState({
    email: userLogined.email,
    name: userLogined.name,
    bday: userLogined.bday,
    add: userLogined.add,
    note: userLogined.note,
    phone: userLogined.phone,
    img: userLogined.img,
  });
  // modal
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

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
    console.log(info);
    dispatch(updateInfoUser(info)); // Gửi đơn hàng tới store
    handleClose();
  };

  return (
    <>
      <div className="text-center">
        <h4>Liên hệ với chúng tôi</h4>
        <div>
          <img id="user-img" className="text-center" src={userLogined.img} />
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
        </div>
      </div>
    </>
  );
}

export default ContactUs;
