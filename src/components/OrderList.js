import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Changedot, getStatus, hanleGetColor } from "../function/functionData";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { cancelOrder } from "../actions/orderAction";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import {
  getCurrentTimeString,
  getDaysDifference,
  prependLocalhost,
} from "../function/functionData";
import Modal from "react-bootstrap/Modal";
import "../css/Cart.css";
import orderApi from "../apis/order.api";
import { clearCart } from "../actions/userAction";
function CartList() {
  const dispatch = useDispatch();
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  if (userLogined == null) {
    navigate("/login");
  }
  // let ListOrder = useSelector((state) => state.orderReducer.orders);
  // let orders = ListOrder.filter((order) => order.email == userLogined.email);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (userEmail) => {
    console.log("đang lấy oder của user có email là ", userEmail);
    setLoading(true); // Cập nhật trạng thái loading ở đây trước khi gọi API
    orderApi
      .getOrderByUserEmail(userEmail)
      .then((response) => {
        setOrders(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response?.statusText);
        setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
      });
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogined) {
      fetchOrders(userLogined.email);
    } else {
      navigate("/login");
    }
  }, []);

  // useEffect(() => {
  //   setLoading(true); // Cập nhật trạng thái loading
  //   setLoading(false); // Cập nhật trạng thái loading
  // }, [orders]);

  const checkTotal = (cart) => {
    let total = 0;
    cart.forEach((product) => {
      total = total + product.price * product.quantity;
    });
    return total;
  };

  const [isShowConfirmCancelOrder, setIsShowConfirmCancelOrder] =
    useState(false);

  const ConfirmCancelOrder = () => {
    return (
      <>
        {" "}
        <Button
          style={{ width: "180px", marginRight: "5px" }}
          variant="danger"
          onClick={() => handleCancelOrder(orderShowing.id)}
        >
          Xác nhận
        </Button>
        <Button
          style={{ width: "180px" }}
          variant="light"
          onClick={() => {
            setIsShowConfirmCancelOrder(false);
          }}
        >
          Huỷ
        </Button>
      </>
    );
  };
  const handleCancelOrder = (id) => {
    setLoading(true);
    let newOrder = { status: -1 };
    orderApi
      .updateOrder(id, newOrder)
      .then((response) => {
        handleClose();
        fetchOrders(userLogined.email);
        setLoading(false); // Cập nhật trạng thái loading ở đây
      })
      .catch((error) => {
        console.log(error.response);
        // alert(error.response);
        setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
      });
    // dispatch(cancelOrder(id));
  };

  const orderInfo = (order) => {
    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th
                colSpan={6}
                style={{
                  backgroundColor: hanleGetColor(order.status),
                }}
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
            {order &&
              order.cart &&
              order.cart.map((product, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td
                      className="p-0"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <img
                        style={{
                          width: "60px",
                          height: "60px",
                          object: "cover",
                        }}
                        src={prependLocalhost(product.img[0])}
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
  const [orderShowing, setOrderShowing] = useState({
    id: "",
    address: {
      name: "",
      note: "",
      address: "",
      phoneNumber: "",
      date: "",
      status: 0,
    },
    email: "",
    cart: [],
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (order) => {
    setShow(true);
    setOrderShowing(order);
    setIsShowConfirmCancelOrder(false);
  };

  if (loading) {
    return <h5 className="text-center msgCartTop">Loading...</h5>;
    // Thay "Loading..." bằng spinner hoặc hình ảnh gif loader của bạn
  } else {
    return orders.length == 0 ? (
      <h5 className="text-center msgCartTop">Bạn không có đơn hàng nào.</h5>
    ) : (
      <div className="text-center">
        <h3 className="text-center ">Đơn hàng của bạn</h3>
        {orders.length > 0 &&
          orders.map((order, i) => {
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
              {orderShowing && orderShowing.cart && orderInfo(orderShowing)}
              <div>
                <br></br>
                <h6>
                  <strong>Thông tin giao hàng</strong>
                </h6>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    Người nhận
                  </InputGroup.Text>
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
                    Đơn hàng đã qua thời gian để có thể huỷ. Vui lòng{" "}
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
              {isShowConfirmCancelOrder == false ? (
                <div>
                  <Button
                    style={{ width: "180px", marginRight: "5px" }}
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Đóng
                  </Button>
                  {console.log(orderShowing.status)}
                  {!(getDaysDifference(orderShowing.date) > 4) &&
                    Number(orderShowing.status) >= 0 && (
                      <Button
                        style={{ width: "180px" }}
                        variant="danger"
                        onClick={() => {
                          setIsShowConfirmCancelOrder(true);
                        }}
                      >
                        Huỷ đơn hàng
                      </Button>
                    )}
                </div>
              ) : (
                ConfirmCancelOrder()
              )}
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}

export default CartList;
