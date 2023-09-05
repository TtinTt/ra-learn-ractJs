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
  CheckLink,
  getDaysDifference,
} from "../../function/functionData";
import Modal from "react-bootstrap/Modal";
import "../../css/Cart.css";
import { updateStatusMess } from "../../actions/messAction";
import MessFilter from "../MessFilter";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import messApi from "../../apis/mess.api";

function ManageMess() {
  // debugger;
  let link = CheckLink();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messDescription, setMessDescription] = useState("");
  const [messs, setMesss] = useState([]);
  const [total, setTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // let messsStore = useSelector((state) => state.messReducer.messs);
  let filter = useSelector((state) => state.messReducer.filter);
  let searchValue = useSelector((state) => state.messReducer.searchFilter);

  // let messs = HandleFilterMess();
  const fetchMesss = async () => {
    // console.log("đang lấy oder của mess có email là ", messEmail);
    // setLoading(true); // Cập nhật trạng thái loading ở đây trước khi gọi API
    await messApi
      .searchMesss({
        name: searchValue,
        page: currentPage,
        limit: messsPerPage,
        sortType: filter,
      })
      .then((data) => {
        setMesss(data.records);
        setTotal(data.total);
        setLoading(false);
        if (data.total <= 10) {
          setCurrentPage(1);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          console.log(error.response?.statusText);
          // navigate("/messs");
        } else {
          console.log(error.response?.statusText);
          setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
        }
      });
  };

  useEffect(() => {
    fetchMesss();
  }, [currentPage, searchValue, filter, link]);

  const handleUpdateStatusMess = async (event, mess) => {
    let value = 1;
    if (event.target.value == "0") {
      value = 0;
    }
    console.log("mess check value", value, mess.id, { ...mess, status: value });
    messApi
      .updateMess(mess.id, { ...mess, status: value })
      .then((response) => {
        handleClose();
        fetchMesss();
        setLoading(false); // Cập nhật trạng thái loading ở đây
      })
      .catch((error) => {
        console.log(error.response?.statusText);
        setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
      });

    await setMessShowing({ ...mess, status: value });
    // await dispatch(updateStatusMess({ ...mess, status: value }));
  };
  // const draftMess = () => {
  //   if (total == 0) {
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
  const messsPerPage = 10;

  const indexOfLastMess = currentPage * messsPerPage;
  const indexOfFirstMess = indexOfLastMess - messsPerPage;

  const currentMesss = messs.slice(indexOfFirstMess, indexOfLastMess);

  const totalPages = Math.ceil(total / messsPerPage);

  // const messsCard = currentMesss.map((mess, index) => {

  const messsCard = messs.map((mess, index) => {
    // console.log(mess);
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
            {mess.id}
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
              <option value="0">Đã phản hồi</option>
              <option value="1">Chưa phản hồi</option>
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
  // thay đổi sẽ chạy lại để lấy giá trị tất cả
  useEffect(() => {
    const description = `${indexOfFirstMess + 1} - ${
      indexOfLastMess > total ? total : indexOfLastMess
    } trong ${total} `;
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
              Trạng thái lời nhắn
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
              <option value="0">Đã phản hồi</option>
              <option value="1">Chưa phản hồi</option>
            </Form.Select>
          </InputGroup>
        </InputGroup>
        <br></br>
        <br></br>
      </div>
    );
  };

  // console.log("messShowing", messShowing);
  if (loading) {
    return <h5 className="text-center msgCartTop">Loading...</h5>;
    // Thay "Loading..." bằng spinner hoặc hình ảnh gif loader
  } else {
    return (
      <>
        {" "}
        <MessFilter></MessFilter>
        {total == 0 ? (
          <h6 className="text-center msgCartTop">
            Không có lời nhắn nào giống như bạn đang tìm kiếm.
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
                  <Modal.Body>
                    {messShowing && messInfo(messShowing)}
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

export default ManageMess;
