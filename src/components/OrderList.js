import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, changeQuantity } from "../actions/cartAction";
import { Changedot, getStatus, hanleGetColor } from "../function/functionData";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { deleteOrder } from "../actions/orderAction";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import {
  getCurrentTimeString,
  getDaysDifference,
} from "../function/functionData";
import Modal from "react-bootstrap/Modal";
import "../css/Cart.css";

import { clearCart } from "../actions/userAction";
function CartList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  let ListOrder = useSelector((state) => state.orderReducer.orders);
  let orders = ListOrder.filter((order) => order.email == userLogined.email);

  const checkTotal = (cart) => {
    let total = 0;
    cart.forEach((product) => {
      total = total + product.price * product.quantity;
    });
    return total;
  };

  const [isShowConfirmDeleteOrder, setIsShowConfirmDeleteOrder] =
    useState(false);

  const ConfirmDeleteOrder = () => {
    return (
      <>
        {" "}
        <Button
          style={{ width: "180px", marginRight: "5px" }}
          variant="danger"
          onClick={() => handleDeleteOrder(orderShowing.id)}
        >
          Xác nhận
        </Button>
        <Button
          style={{ width: "180px" }}
          variant="light"
          onClick={() => {
            setIsShowConfirmDeleteOrder(false);
          }}
        >
          Huỷ
        </Button>
      </>
    );
  };
  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
    handleClose();
  };

  const orderInfo = (order) => {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th
                colSpan={6}
                style={{ backgroundColor: hanleGetColor(order.status) }}
              >
                <p>
                  <span className="float-start m-1">
                    {getStatus(order.status)}
                  </span>
                  <span className="float-end m-1">
                    Đặt hàng lúc {order.date}
                  </span>
                  <span></span>
                </p>
              </th>
            </tr>
            <tr>
              <th width="50px">#</th>
              <th colSpan={2}>Thông tin sản phẩm</th>
              <th width="180px">Đơn giá</th>
              <th width="100px">Số lượng</th>
              <th width="180px">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.cart.map((product, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td className="p-0" style={{ width: "60px", height: "60px" }}>
                    <img
                      style={{
                        width: "60px",
                        height: "60px",
                        object: "cover",
                      }}
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
                      disabled
                      type="number"
                      value={product.quantity}
                    />
                  </td>
                  <td className="rightText">
                    {Changedot([product.price * product.quantity])}
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
                <strong>{Changedot([checkTotal(order.cart)])}</strong>
              </td>
            </tr>
          </tfoot>
        </Table>
      </>
    );
  };
  // modal
  const [orderShowing, setOrderShowing] = useState(orders[0]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (order) => {
    setShow(true);
    setOrderShowing(order);
    setIsShowConfirmDeleteOrder(false);
  };

  return orders.length == 0 ? (
    <h5 className="text-center msgCartTop">Bạn không có đơn hàng nào.</h5>
  ) : (
    <div className="text-center">
      <h3 className="text-center ">Đơn hàng của bạn</h3>
      {orders.map((order, i) => {
        return (
          <div
            onClick={() => {
              handleShow(order);
            }}
          >
            {orderInfo(order)}
          </div>
        );
      })}

      <>
        {/* modal */}
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Chi tiết đơn hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {orderShowing !== {} && orderInfo(orderShowing)}
            <div>
              <br></br>
              <h6>
                <strong>Thông tin giao hàng</strong>
              </h6>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Người nhận</InputGroup.Text>
                <Form.Control disabled value={orderShowing.address.name} />
                <InputGroup.Text id="basic-addon1">
                  Số điện thoại
                </InputGroup.Text>
                <Form.Control
                  disabled
                  value={orderShowing.address.phoneNumber}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  Địa chỉ nhận hàng
                </InputGroup.Text>
                <Form.Control disabled value={orderShowing.address.address} />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  Lưu ý giao hàng
                </InputGroup.Text>
                <Form.Control
                  placeholder="Không có lưu ý giao hàng"
                  disabled
                  value={orderShowing.address.note}
                />
              </InputGroup>

              {getDaysDifference(orderShowing.date) > 4 && (
                <p className="text-center" style={{ color: "#dc3545" }}>
                  Đơn hàng đã hết thời gian có thể huỷ. Vui lòng{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      textDecorationLine: "underline",
                    }}
                    onClick={() => {
                      navigate("/contactUs");
                    }}
                  >
                    liên hệ với chúng tôi
                  </span>{" "}
                  nếu bạn cần hỗ trợ!
                </p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {isShowConfirmDeleteOrder == false ? (
              <div>
                <Button
                  style={{ width: "180px", marginRight: "5px" }}
                  variant="secondary"
                  onClick={handleClose}
                >
                  Đóng
                </Button>
                {getDaysDifference(orderShowing.date) <= 4 && (
                  <Button
                    style={{ width: "180px" }}
                    variant="danger"
                    onClick={() => {
                      setIsShowConfirmDeleteOrder(true);
                    }}
                  >
                    Huỷ đơn hàng
                  </Button>
                )}
              </div>
            ) : (
              ConfirmDeleteOrder()
            )}
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default CartList;
