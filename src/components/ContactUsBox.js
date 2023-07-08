import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
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
import { updateInfoUser } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import { saveMess } from "../actions/messAction";
import { getCurrentTimeString } from "../function/functionData";
import { v4 as uuidv4 } from "uuid";

function ContactUsBox() {
  const navigate = useNavigate();

  let userLogined = useSelector((state) => state.userReducer.userLogined);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };
  const handleShow = () => setShow(true);

  const [isCanEdit, setIsCanEdit] = useState(true);

  const draftInfo = () => {
    if (userLogined) {
      return {
        id: uuidv4(),
        email: userLogined.email,
        name: userLogined.name,
        phone: userLogined.phone,
        date: getCurrentTimeString(),
        mess: "",
        status: false,
      };
    } else {
      return {
        id: uuidv4(),
        email: "",
        name: "",
        phone: "",
        date: getCurrentTimeString(),
        mess: "",
        status: false,
      };
    }
  };
  const [info, setInfo] = useState(draftInfo());
  // modal
  const dispatch = useDispatch();

  const [showErr, setShowErr] = useState(false);

  // modal
  const handleChangeinfo = (event) => {
    const newMess = {
      ...info,
      [event.target.ariaLabel]: event.target.value,
    };

    setInfo(newMess);
    validateInfo(newMess);
  };

  const validateInfo = (newMess) => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!newMess.email || !emailRegex.test(newMess.email)) {
      return "Email không hợp lệ.";
    }
    if (!newMess.phone || newMess.phone.length < 10) {
      return "Số điện thoại không hợp lệ.";
    }

    if (!newMess.mess || newMess.mess.length < 25) {
      return "Lời nhắn của bạn quá ngắn.";
    }

    return null;
  };

  useEffect(() => {
    validateInfo(info);
  }, []);

  const handleSaveMess = () => {
    if (validateInfo(info)) {
      setShowErr(true);
    } else {
      setShowErr(false);
      setShow(true);
      dispatch(saveMess(info)); // Gửi tới store
    }
  };

  return (
    <>
      <div className="text-center">
        <div>
          <img
            id="user-img"
            className="text-center"
            src="https://i.pinimg.com/originals/66/05/a3/6605a36ab24d182e3e2ab26e12472498.gif"
          />
          <InputGroup id="user-info" className="mb-3 mx-auto">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
              <Form.Control
                disabled={userLogined ? true : false}
                aria-label="email"
                aria-describedby="basic-addon1"
                type="email"
                value={userLogined && info.email}
                onChange={handleChangeinfo}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
              <Form.Control
                disabled={userLogined ? true : false}
                aria-label="name"
                aria-describedby="basic-addon1"
                type="text"
                value={userLogined && info.name}
                onChange={handleChangeinfo}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Số điện thoại</InputGroup.Text>
              <Form.Control
                disabled={userLogined ? true : false}
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
                Lời nhắn của bạn{" "}
              </InputGroup.Text>
              <Form.Control
                // placeholder="Ngày sinh"
                aria-label="mess"
                aria-describedby="basic-addon1"
                type="text"
                // as="textarea"
                as="textarea"
                onChange={handleChangeinfo}
              />
            </InputGroup>
          </InputGroup>
          <p>{showErr && validateInfo(info)}</p>
          <Button variant="secondary" onClick={handleSaveMess}>
            <>Để lại lời nhắn cho chúng tôi</>
          </Button>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ alignItems: "center" }}
      >
        <Modal.Header>
          <h5>Lời nhắn đã được gửi đi</h5>
        </Modal.Header>
        <Modal.Body style={{ margin: "10px", textAlign: "center" }}>
          Cảm ơn bạn đã để lại lời nhắn! Chúng tôi sẽ phản hồi trong thời gian
          sớm nhất qua thông tin liên hệ mà bạn đã cung cấp.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Quay về trang chủ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ContactUsBox;
