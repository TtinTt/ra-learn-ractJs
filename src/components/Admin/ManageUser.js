import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Changedot,
  getStatus,
  hanleGetColor,
  HandleFilterUser,
} from "../../function/functionData";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import {
  getCurrentTimeString,
  getDaysDifference,
} from "../../function/functionData";
import Modal from "react-bootstrap/Modal";
import "../../css/Cart.css";
import { updateStatusUser } from "../../actions/userAction";
import UserFilter from "../UserFilter";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
function ManageUser() {
  // debugger;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDescription, setUserDescription] = useState("");
  const [listCheck, setListCheck] = useState([]);

  let usersStore = useSelector((state) => state.userReducer.users);

  let searchValue = useSelector((state) => state.userReducer.searchFilter);

  let users = HandleFilterUser();

  // kiểm tra xem object có trong array không
  const checkIsChecked = (array, searchObject) => {
    return array.some(
      (element) => JSON.stringify(element) === JSON.stringify(searchObject)
    );
  };

  const handleGetChecked = (isChecked, user) => {
    console.log(isChecked);
    if (isChecked) {
      // isChecked true, thêm user vào listCheck
      setListCheck((listCheck) => [...listCheck, user]);
    } else {
      // isChecked false, xóa user khỏi listCheck
      setListCheck((listCheck) =>
        listCheck.filter((item) => item.email !== user.email)
      );
    }
  };

  const checkQuantity = (cart) => {
    let total = 0;
    cart.forEach((user) => {
      total = total + user.quantity;
    });
    return total;
  };

  const handleUpdateStatusUser = async (event, user) => {
    let value = true;
    if (event.target.value == "false") {
      value = false;
    }
    await setUserShowing({ ...user, status: value });
    await dispatch(updateStatusUser({ ...user, status: value }));
  };

  const handleUpdateStatusMultiUser = async (event, listUser) => {
    console.log(event);
    let value = event.target.value === "true" ? true : false;
    console.log(listUser);
    listUser.forEach((user) => {
      dispatch(updateStatusUser({ ...user, status: value }));
    });

    setListCheck([]);
  };

  const [userShowing, setUserShowing] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (user) => {
    setShow(true);
    setUserShowing(user);
  };

  // Pagination phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  // const usersCard = currentUsers.map((user, index) => {

  const usersCard = currentUsers.map((user, index) => {
    // console.log(user);
    return (
      <>
        <tr>
          <td

          // style={{
          //   textAlign: "center",
          //   width: "70px",
          // }}
          >
            <input
              type="checkbox"
              checked={checkIsChecked(listCheck, user)}
              onClick={(e) => handleGetChecked(e.target.checked, user)}
            />
          </td>
          <td
            colSpan={2}
            onClick={() => {
              handleShow(user);
            }}
            style={{
              textAlign: "left",
            }}
          >
            {user.email}
          </td>
          <td
            onClick={() => {
              handleShow(user);
            }}
            style={{
              textAlign: "right",
            }}
          >
            {user.date}
          </td>{" "}
          <td
            onClick={() => {
              handleShow(user);
            }}
            style={{
              textAlign: "left",
            }}
          >
            {user.name}
          </td>
          <td
            onClick={() => {
              handleShow(user);
            }}
            style={{
              textAlign: "left",
            }}
          >
            {user.phone}
          </td>
          <td
            style={{
              textAlign: "left",
            }}
          >
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => {
                handleUpdateStatusUser(event, user);
              }}
              value={user.status.toString()}
            >
              <option value="true">Đang hoạt động</option>
              <option value="false">Đình chỉ</option>
            </Form.Select>
          </td>
        </tr>
      </>
    );
  });

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // khi 1 trong các biến phụ [currentPage, users, indexOfFirstUser, indexOfLastUser]
  // thay đổi sẽ chạy lại để lấy giá trị mới nhất
  useEffect(() => {
    const description = `Đang hiển thị người dùng thứ ${
      indexOfFirstUser + 1
    } đến ${
      indexOfLastUser > users.length ? users.length : indexOfLastUser
    } trong tổng số ${users.length} người dùng`;
    setUserDescription(description);
  }, [currentPage, users, indexOfFirstUser, indexOfLastUser]);

  // Pagination phân trang

  const PaginationSet = () => {
    return (
      <div id="paginationSet">
        <p id="statusPagination">{userDescription}</p>

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

  const userInfo = (info) => {
    // debugger;
    return (
      <div className="text-center">
        <img id="user-img" className="text-center" src={info.img} />

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
            <InputGroup.Text id="basic-addon1">Ngày sinh</InputGroup.Text>
            <Form.Control
              // placeholder="Ngày sinh"
              aria-label="bday"
              aria-describedby="basic-addon1"
              type="date"
              value={info.bday}
              disabled
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
                handleUpdateStatusUser(event, info);
              }}
              value={info.status.toString()}
            >
              <option value="true">Đang hoạt động</option>
              <option value="false">Đình chỉ</option>
            </Form.Select>
          </InputGroup>
        </InputGroup>
        <br></br>
        <br></br>
      </div>
    );
  };

  // console.log("userShowing", userShowing);

  return (
    <>
      {" "}
      <UserFilter></UserFilter>
      {users.length == 0 ? (
        <h6 className="text-center msgCartTop">
          Không có người dùng nào giống như bạn đang tìm kiếm.
        </h6>
      ) : (
        <>
          <div className="text-center">
            <>
              <Table striped busered hover variant="light">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={listCheck.length == currentUsers.length}
                        onClick={(e) =>
                          e.target.checked
                            ? setListCheck(currentUsers)
                            : setListCheck([])
                        }
                      />
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        width: "70px",
                      }}
                    >
                      {" "}
                      {listCheck.length > 0 && (
                        <span>
                          <Form.Select
                            id="multiSetStatus"
                            aria-label="Default select example"
                            onChange={(event) => {
                              handleUpdateStatusMultiUser(event, listCheck);
                            }}
                          >
                            <option>Huỷ</option>
                            <option value="true">Đang hoạt động</option>
                            <option value="false">Đình chỉ</option>
                          </Form.Select>
                        </span>
                      )}
                    </th>
                    <th
                      className="text-left position-relative headTable-Set"
                      style={{ padding: "auto", textAlign: "left" }}
                    >
                      Email
                    </th>
                    <th className="text-center">Ngày tạo tài khoản</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Số điện thoại</th>
                    <th className="text-center">Trạng thái tài khoản</th>
                  </tr>
                </thead>
                <tbody>{usersCard}</tbody>
              </Table>
              {PaginationSet()}
            </>

            <>
              {/* modal */}
              <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>{userShowing && userInfo(userShowing)}</Modal.Body>
              </Modal>
            </>
          </div>
        </>
      )}
    </>
  );
}

export default ManageUser;
