import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { createOrder } from "../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, changeQuantity } from "../actions/cartAction";
import { Changedot } from "../function/functionData";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import orderApi from "../apis/order.api";
import { getCurrentTimeString } from "../function/functionData";
import Modal from "react-bootstrap/Modal";

import "../css/Cart.css";

import { clearCart } from "../actions/userAction";
function CartList() {
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  let cart = userLogined.cart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let total = 0;
  cart.forEach((product) => {
    total = total + product.price * product.quantity;
  });
  const [isShowConfirmClearCart, setIsShowConfirmClearCart] = useState(false);
  const [isShowError, setIsShowError] = useState(false);

  const handleChange = (event, id) => {
    const quantity = Number(event.target.value);
    if (quantity > 0) {
      dispatch(changeQuantity(id, quantity));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleClearCart = (id) => {
    dispatch(clearCart()); // Clear giỏ hàng hiện tại
    setIsShowConfirmClearCart(false);
  };

  const ConfirmClearCart = () => {
    return (
      <>
        <Button
          style={{ width: "180px" }}
          variant="light"
          onClick={() => {
            setIsShowConfirmClearCart(false);
          }}
        >
          Huỷ
        </Button>
        <Button
          style={{ width: "180px", marginRight: "5px" }}
          variant="secondary"
          onClick={handleClearCart}
        >
          Xác nhận xoá
        </Button>
      </>
    );
  };

  // modal
  const [isValidateError, setIsValidateError] = useState(false);
  const [errorValidateMsg, setErrorValidateMsg] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setIsValidateError(false);
    setErrorValidateMsg("");
    setIsShowError(false);
  };
  const handleShow = () => setShow(true);

  const [address, setAddress] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    note: "",
  });

  const handleChangeAddress = (event) => {
    let key = event.target.id.split(" ")[1];
    const newAddress = {
      ...address,
      [key]: event.target.value,
    };
    // console.log(key);
    // console.log(newAddress);
    setAddress(newAddress);
    validateAddress(newAddress);
  };

  const validateAddress = (data) => {
    const { name, address, phoneNumber, note } = data;
    if (name == "" || address == "" || phoneNumber == "") {
      setIsValidateError(true);
      setErrorValidateMsg(
        "Không thể để trống tên, địa chỉ hoặc số điện thoại."
      );
      return false;
    } else if (name && (name.length < 3 || name.length > 80)) {
      setIsValidateError(true);
      setErrorValidateMsg("Tên không hợp lệ.");
      return false;
    } else if (phoneNumber && phoneNumber.length < 10) {
      setIsValidateError(true);
      setErrorValidateMsg("Số điện thoại không hợp lệ.");
      return false;
    } else if (address && address.length < 20) {
      setIsValidateError(true);
      setErrorValidateMsg(
        "Địa chỉ không hợp lệ. Vui lòng viết địa chỉ chi tiết hơn"
      );
      return false;
    } else {
      setIsValidateError(false);
      setErrorValidateMsg("");
      return true;
    }
  };

  const handleCreateOrder = () => {
    if (validateAddress(address)) {
      const order = {
        email: userLogined.email,
        // id: uuidv4(),
        cart: cart,
        address: address,
        date: getCurrentTimeString(),
        status: "0",
      };
      console.log(order);

      orderApi
        .createOrder(order)
        .then((response) => {
          // dispatch(register(response.token));
          // handleClearCart();
          handleClose();
          navigate("/order");
        })
        .catch((error) => {
          // if (error.response.statusText == "Forbidden") {
          //   setError({
          //     isShowStatus: true,
          //     status: true,
          //     errorMsg:
          //       "Email đã tồn tại, vui lòng đăng nhập hoặc đăng ký bằng một email khác",
          //   });

          //   console.log("trùng lặp user");
          // } else {
          //   alert(error.response.statusText);
          // }

          alert(error.response.statusText);
        });

      // dispatch(createOrder(order)); // Gửi đơn hàng tới store
    } else {
      setIsShowError(true);
    }
  };
  // modal
  return cart.length == 0 ? (
    <h5 className="text-center msgCartTop">
      Giỏ hàng của bạn không có sản phẩm nào.
    </h5>
  ) : (
    <div className="text-center">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th colSpan={2}>Thông tin sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td className="p-0" style={{ width: "60px", height: "60px" }}>
                  <img
                    style={{ width: "60px", height: "60px", object: "cover" }}
                    src={product.img[0]}
                  ></img>
                </td>
                <td
                  className="leftText"
                  // style={{ textAlign: "left" }}
                >
                  {product.name}
                </td>
                <td>{Changedot(product.price)}</td>
                <td className="rightText">
                  <Form.Control
                    type="number"
                    value={product.quantity}
                    onChange={(event) =>
                      handleChange(event, product.product_id)
                    }
                  />
                </td>
                <td className="rightText">
                  {Changedot([product.price * product.quantity])}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="rightText" colSpan={5}>
              Tổng đơn hàng
            </td>
            <td className="rightText">
              <strong>{Changedot([total])}</strong>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
      <div className="mx-auto p-1">
        {isShowConfirmClearCart == false ? (
          <>
            <Button
              style={{ width: "180px", marginRight: "5px" }}
              variant="light"
              onClick={() => {
                setIsShowConfirmClearCart(true);
              }}
            >
              Xoá giỏ hàng
            </Button>
            <Button
              style={{ width: "180px" }}
              variant="secondary"
              onClick={handleShow}
            >
              Đặt hàng
            </Button>
          </>
        ) : (
          ConfirmClearCart()
        )}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin nhận hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <FloatingLabel
              controlId="floatingInput name"
              label="Tên người nhận"
              className="mb-3"
              onChange={handleChangeAddress}
            >
              <Form.Control type="text" placeholder="?" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput phoneNumber"
              label="Số điện thoại"
              className="mb-3"
              onChange={handleChangeAddress}
            >
              <Form.Control type="number" placeholder="?" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput address"
              label="Địa chỉ"
              className="mb-3"
              onChange={handleChangeAddress}
            >
              <Form.Control type="text" placeholder="?" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput note"
              label="Lưu ý giao hàng"
              className="mb-3"
              onChange={handleChangeAddress}
            >
              <Form.Control type="text" placeholder="?" />
            </FloatingLabel>
            <p style={{ color: "#dc3545" }}>
              {" "}
              {isShowError == true && errorValidateMsg}
            </p>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="secondary" onClick={handleCreateOrder}>
            Xác nhận đơn hàng
          </Button>
          <p className="text-center ">
            Bạn có thể huỷ đơn hàng của mình trong vòng 4 giờ sau khi đặt hàng.
            Đơn hàng sẽ giao tới địa chỉ của bạn trong vòng 4-10 ngày làm việc.
            Bạn cần thanh toán <strong>{Changedot([total])}</strong> khi nhận
            hàng.
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CartList;
