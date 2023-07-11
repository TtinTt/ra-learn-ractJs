import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Changedot,
  getStatus,
  hanleGetColor,
  HandleFilterMess,
  TruncateString,
} from "../../function/functionData";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import {
  getCurrentTimeString,
  getDaysDifference,
} from "../../function/functionData";
import Modal from "react-bootstrap/Modal";
import "../../css/Cart.css";
import { updateStatusMess } from "../../actions/messAction";
import MessFilter from "../MessFilter";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
function ManageMess() {
  // debugger;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messDescription, setMessDescription] = useState("");

  let messsStore = useSelector((state) => state.messReducer.messs);

  let searchValue = useSelector((state) => state.messReducer.searchFilter);

  let messs = HandleFilterMess();

  const checkTotal = (cart) => {
    let total = 0;
    cart.forEach((mess) => {
      total = total + mess.price * mess.quantity;
    });
    return total;
  };

  const checkQuantity = (cart) => {
    let total = 0;
    cart.forEach((mess) => {
      total = total + mess.quantity;
    });
    return total;
  };

  const handleUpdateStatusMess = async (event, mess) => {
    let value = true;
    if (event.target.value == "false") {
      value = false;
    }
    await setMessShowing({ ...mess, status: value });
    await dispatch(updateStatusMess({ ...mess, status: value }));
  };
  // const draftMess = () => {
  //   if (messs.length == 0) {
  //     return null;
  //   } else {
  //     return messs[0];
  //   }
  // };

  const [messShowing, setMessShowing] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (mess) => {
    setShow(true);
    setMessShowing(mess);
  };

  // Pagination phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const messsPerPage = 10;

  const indexOfLastMess = currentPage * messsPerPage;
  const indexOfFirstMess = indexOfLastMess - messsPerPage;

  const currentMesss = messs.slice(indexOfFirstMess, indexOfLastMess);

  const totalPages = Math.ceil(messs.length / messsPerPage);

  // const messsCard = currentMesss.map((mess, index) => {

  const messsCard = messs.map((mess, index) => {
    console.log(mess);
    return (
      <>
        <tr>
          <td
            onClick={() => {
              handleShow(mess);
            }}
            style={{
              textAlign: "center",
            }}
          >
            {index + 1}
          </td>
          <td
            onClick={() => {
              handleShow(mess);
            }}
            style={{
              textAlign: "center",
            }}
          >
            {mess.date}
          </td>
          <td
            onClick={() => {
              handleShow(mess);
            }}
            style={{
              textAlign: "left",
            }}
          >
            {mess.email}
          </td>{" "}
          <td
            onClick={() => {
              handleShow(mess);
            }}
            style={{
              textAlign: "left",
            }}
          >
            {mess.name}
          </td>
          <td
            onClick={() => {
              handleShow(mess);
            }}
            style={{
              textAlign: "center",
            }}
          >
            {mess.phone}
          </td>
          <td
            onClick={() => {
              handleShow(mess);
            }}
            style={{
              textAlign: "left",
            }}
          >
            {TruncateString(mess.mess, 20)}
          </td>
          <td
            style={{
              textAlign: "left",
            }}
          >
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => {
                handleUpdateStatusMess(event, mess);
              }}
              value={
                mess.status
                // .toString()
              }
            >
              <option value="true">Đã phản hồi</option>
              <option value="false">Chưa phản hồi</option>
            </Form.Select>
          </td>
        </tr>
      </>
    );
  });

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // khi 1 trong các biến phụ [currentPage, messs, indexOfFirstMess, indexOfLastMess]
  // thay đổi sẽ chạy lại để lấy giá trị mới nhất
  useEffect(() => {
    const description = `Đang hiển thị lời nhắn thứ ${
      indexOfFirstMess + 1
    } đến ${
      indexOfLastMess > messs.length ? messs.length : indexOfLastMess
    } trong tổng số ${messs.length} lời nhắn`;
    setMessDescription(description);
  }, [currentPage, messs, indexOfFirstMess, indexOfLastMess]);

  // Pagination phân trang

  const PaginationSet = () => {
    return (
      <div id="paginationSet">
        <p id="statusPagination">{messDescription}</p>

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

  const messInfo = (info) => {
    // debugger;
    return (
      <div className="text-center">
        <img id="mess-img" className="text-center" src={info.img} />

        <InputGroup id="mess-info" className="mb-3 mx-auto">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            <Form.Control
              // placeholder="Email của bạn"
              disabled
              aria-label="email"
              aria-describedby="basic-addon1"
              type="email"
              value={info.email}
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
              disabled
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
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Lời nhắn</InputGroup.Text>
            <Form.Control
              // placeholder="Ngày sinh"
              aria-label="img"
              aria-describedby="basic-addon1"
              type="text"
              as="textarea"
              value={info.mess}
              disabled
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Trạng thái tài khoản
            </InputGroup.Text>
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => {
                handleUpdateStatusMess(event, info);
              }}
              value={
                info.status
                // .toString()
              }
            >
              <option value="true">Đã phản hồi</option>
              <option value="false">Chưa phản hồi</option>
            </Form.Select>
          </InputGroup>
        </InputGroup>
        <br></br>
        <br></br>
      </div>
    );
  };

  // console.log("messShowing", messShowing);

  return (
    <>
      {" "}
      <MessFilter></MessFilter>
      {messs.length == 0 ? (
        <h6 className="text-center msgCartTop">
          Không có lời nhắn nào giống như bạn đang tìm kiếm.
        </h6>
      ) : (
        <>
          <div className="text-center">
            <>
              <Table striped bmessed hover variant="light">
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th
                      className="text-left position-relative"
                      style={{ padding: "auto" }}
                    >
                      Ngày tạo lời nhắn
                    </th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Số điện thoại</th>
                    <th className="text-center">Nội dung</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>{messsCard}</tbody>
              </Table>
              {PaginationSet()}
            </>

            <>
              {/* modal */}
              <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thông tin lời nhắn</Modal.Title>
                </Modal.Header>
                <Modal.Body>{messShowing && messInfo(messShowing)}</Modal.Body>
              </Modal>
            </>
          </div>
        </>
      )}
    </>
  );
}

export default ManageMess;
