import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Changedot,
  getStatus,
  hanleGetColor,
  HandleFilterOrder,
} from "../../function/functionData";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import {
  getCurrentTimeString,
  getDaysDifference,
  CheckLink,
} from "../../function/functionData";
import Modal from "react-bootstrap/Modal";
import "../../css/Cart.css";
import { updateStatusOrder } from "../../actions/orderAction";
import OrderFilter from "../OrderFilter";
import Pagination from "react-bootstrap/Pagination";
import orderApi from "../../apis/order.api";

function ManageOrder() {
  let link = null;
  let checkLink = CheckLink();
  // debugger;
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderDescription, setOrderDescription] = useState("");
  const [total, setTotal] = useState([]);

  // let ordersStore = useSelector((state) => state.orderReducer.orders);

  let searchValue = useSelector((state) => state.orderReducer.searchFilter);

  let filter = useSelector((state) => state.orderReducer.filter);

  // let orders = HandleFilterOrder();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const checkTotal = (cart) => {
    let total = 0;
    if (cart !== undefined) {
      cart.forEach((order) => {
        total = total + order.price * order.quantity;
      });
    }
    return total;
  };

  const checkQuantity = (cart) => {
    let total = 0;
    if (cart !== undefined) {
      cart.forEach((order) => {
        total = total + order.quantity;
      });
    }

    return total;
  };

  const draftOrder = () => {
    if (total == 0) {
      return null;
    } else {
      return orders[0];
    }
  };

  const fetchOrders = async () => {
    // console.log("đang lấy oder của user có email là ", userEmail);
    // setLoading(true); // Cập nhật trạng thái loading ở đây trước khi gọi API
    await orderApi
      .searchOrders({
        name: searchValue,
        page: currentPage,
        limit: ordersPerPage,
        sortType: filter,
      })
      .then((data) => {
        setOrders(data.records);
        setTotal(data.total);
        setLoading(false);
        if (data.total <= 10) {
          setCurrentPage(1);
        }
      })
      .catch((error) => {
        alert(error);
        if (error.response.status === 401) {
          alert(error.response.statusText);
          // navigate("/orders");
        } else {
          alert(error.response.statusText);
          setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
        }
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchValue, filter, link]);

  const handleUpdateStatusOrder = async (event) => {
    await setOrderShowing({ ...orderShowing, status: event.target.value });

    // await dispatch(
    //   updateStatusOrder({ ...orderShowing, status: event.target.value })
    // );

    // setLoading(true);
    let newOrder = { status: event.target.value };
    console.log(newOrder);
    orderApi
      .updateOrder(orderShowing.id, newOrder)
      .then((response) => {
        handleClose();
        fetchOrders();
        setLoading(false); // Cập nhật trạng thái loading ở đây
      })
      .catch((error) => {
        alert(error.response.statusText);
        setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
      });
  };

  const [orderShowing, setOrderShowing] = useState(draftOrder());

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (order) => {
    setShow(true);
    setOrderShowing(order);
  };

  // Pagination phân trang

  const ordersPerPage = 10;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(total / ordersPerPage);

  const ordersCard = orders.map((order, index) => {
    return (
      <>
        <tr
          onClick={() => {
            handleShow(order);
          }}
        >
          <td
            style={{
              textAlign: "center",
            }}
          >
            {index + 1}
          </td>
          <td
            style={{
              textAlign: "left",
            }}
          >
            {order.email}
          </td>
          <td
            style={{
              textAlign: "right",
            }}
          >
            {order.date}
          </td>
          <td
            style={{
              textAlign: "right",
            }}
          >
            {[checkQuantity(order.cart)]}
          </td>
          <td
            style={{
              textAlign: "right",
            }}
          >
            {Changedot([checkTotal(order.cart)])}
          </td>
          <td
            style={{
              textAlign: "left",
            }}
          >
            {getStatus(order.status)}
          </td>
        </tr>
      </>
    );
  });

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // khi 1 trong các biến phụ [currentPage, orders, indexOfFirstOrder, indexOfLastOrder]
  // thay đổi sẽ chạy lại để lấy giá trị mới nhất
  useEffect(() => {
    const description = `Đang hiển thị đơn hàng thứ ${
      indexOfFirstOrder + 1
    } đến ${
      indexOfLastOrder > total ? total : indexOfLastOrder
    } trong tổng số ${total} đơn hàng`;
    setOrderDescription(description);
  }, [currentPage, orders, indexOfFirstOrder, indexOfLastOrder]);

  // Pagination phân trang

  const PaginationSet = () => {
    return (
      <div id="paginationSet">
        <p id="statusPagination">{orderDescription}</p>

        {totalPages && (
          <Pagination id="pagination">
            <Pagination.First
              onClick={() => changePage(1)}
              disabled={currentPage === 1}
            />

            <Pagination.Prev
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => changePage(number)}
                >
                  {number}
                </Pagination.Item>
              )
            )}

            <Pagination.Next
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />

            <Pagination.Last
              onClick={() => changePage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </div>
    );
  };
  const orderInfo = (order) => {
    // debugger;
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
            {order.cart.map((order, index) => {
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
                      src={order.img[0]}
                    ></img>
                  </td>
                  <td
                    className="leftText"
                    // style={{ textAlign: "left" }}
                  >
                    {order.name}
                  </td>
                  <td>{Changedot(order.price)}</td>
                  <td className="rightText">
                    <Form.Control
                      disabled
                      type="number"
                      value={order.quantity}
                    />
                  </td>
                  <td className="rightText">
                    {Changedot([order.price * order.quantity])}
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

  // console.log("orderShowing", orderShowing);
  if (loading) {
    return <h5 className="text-center msgCartTop">Loading...</h5>;
    // Thay "Loading..." bằng spinner hoặc hình ảnh gif loader của bạn
  } else {
    return (
      <>
        {" "}
        <OrderFilter></OrderFilter>
        {total == 0 ? (
          <h6 className="text-center msgCartTop">
            Không có đơn hàng nào giống như bạn đang tìm kiếm.
          </h6>
        ) : (
          <>
            <div className="text-center">
              <>
                <Table striped bordered hover variant="light">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th
                        className="text-left position-relative"
                        style={{ padding: "auto" }}
                      >
                        Khách hàng
                      </th>
                      <th className="text-center">Thời gian</th>
                      <th className="text-center">Số lượng sản phẩm</th>
                      <th className="text-center">Giá đơn hàng</th>
                      <th className="text-center">Trạng thái đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody>{ordersCard}</tbody>
                </Table>
                {PaginationSet()}
              </>

              <>
                {/* modal */}
                <Modal size="lg" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {orderShowing && orderInfo(orderShowing)}
                    {orderShowing && (
                      <div>
                        <br></br>
                        <h6>
                          <strong>Thông tin giao hàng</strong>
                        </h6>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon1">
                            Người nhận
                          </InputGroup.Text>
                          <Form.Control
                            disabled
                            value={orderShowing.address.name}
                          />
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
                          <Form.Control
                            disabled
                            value={orderShowing.address.address}
                          />
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

                        <>
                          <br></br>
                          <p>
                            <strong>Cập nhật trạng thái đơn hàng</strong>
                          </p>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => {
                              handleUpdateStatusOrder(event);
                            }}
                            value={orderShowing.status}
                          >
                            <option value="0">
                              Đang xử lý thông tin đơn hàng
                            </option>
                            <option value="1">
                              Đơn hàng đang được chuẩn bị
                            </option>
                            <option value="2">
                              Đơn hàng đang được giao tới
                            </option>
                            <option value="3">
                              Đơn hàng đã được giao thành công
                            </option>
                            <option value="4">
                              Đơn hàng giao không thành công và đang chuyển hoàn
                            </option>
                            <option value="5">
                              Đơn hàng đã được chuyển hoàn
                            </option>
                            <option value="-1">
                              Đơn hàng đã bị huỷ bởi khách hàng
                            </option>
                            <option value="-2">Từ chối đơn hàng</option>
                          </Form.Select>
                        </>
                        {getDaysDifference(orderShowing.date) < 4 && (
                          <>
                            <br></br>
                            <p
                              className="text-center"
                              style={{ color: "#dc3545" }}
                            >
                              Đơn hàng đang được xử lý và còn trong thời gian có
                              thể huỷ bởi khách hàng
                            </p>
                          </>
                        )}
                        <br></br>
                      </div>
                    )}
                  </Modal.Body>
                </Modal>
              </>
            </div>
          </>
        )}
      </>
    );
  }
}

export default ManageOrder;
