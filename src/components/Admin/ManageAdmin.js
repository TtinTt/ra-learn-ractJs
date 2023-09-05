import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Changedot,
  getStatus,
  hanleGetColor,
  HandleFilterAdmin,
  CheckLink,
  prependLocalhost,
} from "../../function/functionData";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import {
  getCurrentTimeString,
  getDaysDifference,
} from "../../function/functionData";
import Modal from "react-bootstrap/Modal";
import "../../css/Cart.css";
import { updateStatusAdmin } from "../../actions/adminAction";
import AdminFilter from "../AdminFilter";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import adminApi from "../../apis/admin.api";
import eye from "../../imgs/eye.png";
import hidden from "../../imgs/hidden.png";

function ManageAdmin() {
  // debugger;
  let link = CheckLink();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminDescription, setAdminDescription] = useState("");
  const [listCheck, setListCheck] = useState([]);
  const [total, setTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPass, setShowPass] = useState(true);
  const [showResetPass, setShowResetPass] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRole, setErrorRole] = useState("");
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  // const handleCreateNewAdmin = () => {
  //   return {
  //     email: "",
  //     // date: getCurrentTimeString(),
  //     password: "",
  //     // status: 1,
  //   };
  // };
  const [newAdmin, setNewAdmin] = useState({ email: "", password: "" });

  // let adminsStore = useSelector((state) => state.adminReducer.admins);

  let searchValue = useSelector((state) => state.adminReducer.searchFilter);
  let filter = useSelector((state) => state.adminReducer.filter);

  // let admins = HandleFilterAdmin();
  const [admins, setAdmins] = useState([]);
  let adminLogined = useSelector((state) => state.adminReducer.adminLogined);

  // kiểm tra xem object có trong array không
  const checkIsChecked = (array, searchObject) => {
    return array.some(
      (element) => JSON.stringify(element) === JSON.stringify(searchObject)
    );
  };

  const handleGetChecked = (isChecked, admin) => {
    console.log(isChecked);
    if (isChecked) {
      // isChecked true, thêm admin vào listCheck
      setListCheck((listCheck) => [...listCheck, admin]);
    } else {
      // isChecked false, xóa admin khỏi listCheck
      setListCheck((listCheck) =>
        listCheck.filter((item) => item.email !== admin.email)
      );
    }
  };

  const fetchAdmins = async () => {
    // console.log("đang lấy oder của admin có email là ", adminEmail);
    // setLoading(true); // Cập nhật trạng thái loading ở đây trước khi gọi API
    await adminApi
      .searchAdmins({
        name: searchValue,
        page: currentPage,
        limit: adminsPerPage,
        sortType: filter,
      })
      .then((data) => {
        setAdmins(data.records);
        setTotal(data.total);
        if (data.total <= 10) {
          setCurrentPage(1);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          console.log(error.response?.statusText);
          // navigate("/admins");

          setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
        } else {
          console.log(error.response?.statusText);
          setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
        }
      });
  };

  useEffect(() => {
    fetchAdmins();
  }, [currentPage, searchValue, filter, link]);

  const handleUpdateStatusAdmin = async (event, admin) => {
    // setLoading(true); // Cập nhật trạng thái loading ở đây

    let value = event.target.value == "1" ? 1 : 0;

    console.log("admin", admin);
    adminApi
      .updateAdmin(admin.admin_id, {
        ...admin,
        status: event.target.value == "0" ? 0 : 1,
      })
      .then((response) => {
        // console.log(response.response);
        if (response?.response.status == 403) {
          setErrorPassword("Bạn không có quyền thực hiện cập nhật này");
          console.log(errorRole);
          return;
        } else {
          setErrorPassword("");
          // setLoading(true); // Cập nhật trạng thái loading ở đây
          // handleClose();
        }
      })
      .catch((error) => {
        console.log(error.response?.statusText);
        setLoading(false); // Cập nhật trạng thái loading nếu có lỗi
      });
    fetchAdmins();

    await setAdminShowing({ ...admin, status: value });
    // await dispatch(updateStatusAdmin({ ...admin, status: value }));
  };

  const handleUpdatePasswordAdmin = async (newPassword, admin) => {
    if (errorPassword.length !== 0) {
      return;
    } else {
      console.log("admin", admin);
      adminApi
        .updateAdmin(admin.admin_id, {
          ...admin,
          resetPassword: newPassword,
        })
        .then((response) => {
          if (response?.response?.status == 403) {
            setErrorPassword("Bạn không có quyền thực hiện cập nhật này");
            console.log(errorRole);
            return;
          } else {
            console.log(errorRole);
            setErrorPassword("");
          }

          setShowResetPass(false);
          setErrorPassword("");
          setNewPassword("");
        })
        .catch((error) => {
          console.log(error);
          console.log("Mật khẩu không hợp lệ");
          setErrorPassword("Mật khẩu không hợp lệ");
          console.log(error);
        });
    }
  };

  const handleAddAdmin = async (newAdmin) => {
    if (errorPassword.length !== 0) {
      return;
    } else {
      adminApi
        .addAdmin({
          email: newAdmin.email,
          password: newAdmin.password,
          date: getCurrentTimeString(),
          status: 1,
        })
        .then((response) => {
          console.log(response);
          fetchAdmins();
          handleClose();
          // dispatch(register(response.token));
          // navigate("/login");
        })
        .catch((error) => {
          if (error.response?.statusText == "Forbidden") {
            setErrorPassword(
              "Email đã tồn tại, vui lòng đăng nhập hoặc đăng ký bằng một email khác"
            );

            console.log("trùng lặp admin");
          } else {
            console.log(error.response?.statusText);
          }
        });
    }
  };

  const validatePassword = (password) => {
    if (!(password.length >= 6 && password.length <= 200)) {
      setErrorPassword("Mật khẩu chỉ cho phép từ 6 đến 200 ký tự.");
    } else {
      setErrorPassword("");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!regex.test(email)) {
      setErrorPassword("Email không hợp lệ.");
    } else {
      setErrorPassword("");
    }
  };

  const handleUpdateStatusMultiAdmin = async (event, listAdmin) => {
    console.log(event);
    let value = event.target.value === "1" ? 1 : 0;
    console.log(listAdmin);
    listAdmin.forEach((admin) => {
      adminApi
        .updateAdmin(admin.admin_id, { ...admin, status: value })
        .then((response) => {
          if (response?.response.status == 403) {
            setErrorRole("Bạn không có quyền thực hiện cập nhật này");
            console.log(errorRole);
            return;
          } else {
            console.log(errorRole);
            setErrorRole("");
          }

          // setLoading(false); // Cập nhật trạng thái loading ở đây
        })
        .catch((error) => {
          console.log(error.response?.statusText);
        });
      fetchAdmins();
      handleClose();
      setLoading(false); // Cập nhật trạng thái loading nếu có lỗi

      // dispatch(updateStatusAdmin({ ...admin, status: value }));
    });

    setListCheck([]);
  };

  const [adminShowing, setAdminShowing] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setNewAdmin({ email: "", password: "" });
    setIsAddingAdmin(false);
    setShowResetPass(false);
    setErrorPassword("");
    setNewPassword("");
    setShow(false);
  };

  const handleShow = (admin) => {
    setShow(true);
    setAdminShowing(admin);
  };

  // Pagination phân trang
  const adminsPerPage = 10;

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;

  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const totalPages = Math.ceil(total / adminsPerPage);
  // const adminsCard = currentAdmins.map((admin, index) => {

  const adminsCard = currentAdmins.map((admin, index) => {
    if (loading) {
      return <h5 className="text-center msgCartTop">Loading...</h5>;
      // Thay "Loading..." bằng spinner hoặc hình ảnh gif loader
    } else {
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
                checked={checkIsChecked(listCheck, admin)}
                onClick={(e) => handleGetChecked(e.target.checked, admin)}
              />
            </td>
            <td
              colSpan={2}
              onClick={() => {
                handleShow(admin);
              }}
              style={{
                textAlign: "left",
              }}
            >
              {admin.email}
            </td>
            <td
              onClick={() => {
                handleShow(admin);
              }}
              style={{
                textAlign: "center",
              }}
            >
              {admin.date}
            </td>{" "}
            {/* <td
            onClick={() => {
              handleShow(admin);
            }}
            style={{
              textAlign: "left",
            }}
          >
            {admin.name}
          </td>
          <td
            onClick={() => {
              handleShow(admin);
            }}
            style={{
              textAlign: "center",
            }}
          >
            {admin.phone}
          </td> */}
            <td
              style={{
                textAlign: "left",
              }}
            >
              <Form.Select
                disabled={
                  admin.admin_id == 1 || adminLogined.admin_id !== 1
                    ? true
                    : false
                }
                aria-label="Default select example"
                onChange={(event) => {
                  setLoading(true);
                  handleUpdateStatusAdmin(event, admin);
                }}
                value={admin.status.toString()}
                // onClick={() => {
                // }}
              >
                <option value="1">Đang hoạt động</option>
                <option value="0">Đình chỉ</option>
              </Form.Select>
            </td>
          </tr>
        </>
      );
    }
  });

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // khi 1 trong các biến phụ [currentPage, admins, indexOfFirstAdmin, indexOfLastAdmin]
  // thay đổi sẽ chạy lại để lấy giá trị tất cả
  useEffect(() => {
    const description = `${indexOfFirstAdmin + 1} - ${
      indexOfLastAdmin > total ? total : indexOfLastAdmin
    } trong ${total}`;
    setAdminDescription(description);
  }, [currentPage, admins, indexOfFirstAdmin, indexOfLastAdmin]);

  // Pagination phân trang

  const PaginationSet = () => {
    return (
      <div id="paginationSet">
        <p id="statusPagination">{adminDescription}</p>

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
  useEffect(() => {
    console.log(newAdmin);
  }, [newAdmin]);

  const adminInfo = (info) => {
    // debugger;
    // {if(isAddingAdmin){}else{}}
    return (
      <div className="text-center">
        <img
          id="admin-img"
          className="text-center"
          src={prependLocalhost(info.img)}
        />

        <InputGroup id="admin-info" className="mb-3 mx-auto">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
            <Form.Control
              // placeholder="Email của bạn"
              placeholder={"Email"}
              disabled={!isAddingAdmin}
              aria-label="email"
              aria-describedby="basic-addon1"
              type="email"
              value={info.email}
              onChange={(event) => {
                validateEmail(event.target.value);
                console.log(newAdmin);
                setNewAdmin({ ...newAdmin, email: event.target.value });
              }}
            />
          </InputGroup>
          {!isAddingAdmin && (
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Ngày tạo tài khoản
              </InputGroup.Text>
              <Form.Control
                // placeholder="Ngày sinh"
                aria-label="bday"
                aria-describedby="basic-addon1"
                // type="date"
                value={info.date}
                disabled
              />
            </InputGroup>
          )}
          {!isAddingAdmin && (
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Trạng thái tài khoản
              </InputGroup.Text>
              <Form.Select
                disabled={
                  info.admin_id == 1 || adminLogined.admin_id !== 1
                    ? true
                    : false
                }
                aria-label="Default select example"
                onChange={(event) => {
                  handleUpdateStatusAdmin(event, info);
                }}
                value={info.status.toString()}
              >
                <option value="1">Đang hoạt động</option>
                <option value="0">Đình chỉ</option>
              </Form.Select>
            </InputGroup>
          )}
          {isAddingAdmin && (
            <div style={{ width: "100%" }}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Mật khẩu</InputGroup.Text>
                <Form.Control
                  placeholder={"Mật khẩu"}
                  aria-describedby="basic-addon1"
                  type={!showPass ? "Password" : "text"}
                  value={newPassword}
                  onChange={(event) => {
                    setNewAdmin({ ...newAdmin, password: event.target.value });
                    setNewPassword(event.target.value);
                    validatePassword(event.target.value);
                  }}
                />
                <Button
                  variant="light"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                >
                  <img
                    src={!showPass ? hidden : eye}
                    style={{ width: "20px" }}
                  ></img>
                </Button>
              </InputGroup>
              {errorPassword && (
                <p style={{ width: "100%" }}>{errorPassword}</p>
              )}
              <Button
                variant="light"
                onClick={() => {
                  handleAddAdmin(newAdmin);
                }}
              >
                Lưu quản trị viên mới
              </Button>
            </div>
          )}
          {!isAddingAdmin &&
            (!showResetPass ? (
              (info.admin_id == adminLogined.admin_id ||
                adminLogined.admin_id == 1) && (
                <div style={{ width: "100%" }}>
                  <Button
                    variant="light"
                    onClick={() => {
                      setShowResetPass(true);
                    }}
                  >
                    Đặt lại mật khẩu
                  </Button>
                </div>
              )
            ) : (
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  Mật khẩu mới
                </InputGroup.Text>
                <Form.Control
                  placeholder={null}
                  aria-describedby="basic-addon1"
                  type={!showPass ? "Password" : "text"}
                  value={newPassword}
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                    validatePassword(event.target.value);
                  }}
                />

                <Button
                  variant="light"
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                >
                  <img
                    src={!showPass ? hidden : eye}
                    style={{ width: "20px" }}
                  ></img>
                </Button>

                <Button
                  variant="light"
                  onClick={() => {
                    handleUpdatePasswordAdmin(newPassword, info);
                  }}
                >
                  Đặt lại mật khẩu
                </Button>

                {errorPassword && (
                  <p style={{ width: "100%" }}>{errorPassword}</p>
                )}
              </InputGroup>
            ))}
        </InputGroup>
        <br></br>
        <br></br>
      </div>
    );
  };

  // console.log("adminShowing", adminShowing);
  if (loading) {
    return <h5 className="text-center msgCartTop">Loading...</h5>;
    // Thay "Loading..." bằng spinner hoặc hình ảnh gif loader
  } else {
    return (
      <>
        {" "}
        <AdminFilter></AdminFilter>
        {total == 0 ? (
          <h6 className="text-center msgCartTop">
            Không có quản trị viên nào giống như bạn đang tìm kiếm.
          </h6>
        ) : (
          <>
            <div className="text-center">
              <>
                <Table striped bordered hover variant="light">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={listCheck.length == currentAdmins.length}
                          onClick={(e) =>
                            e.target.checked
                              ? setListCheck(currentAdmins)
                              : setListCheck([])
                          }
                        />
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          width: "70px",
                          borderRight: "none",
                        }}
                      >
                        {" "}
                        {listCheck.length > 0 && (
                          <span>
                            <Form.Select
                              disabled={
                                adminLogined.admin_id == 1 ? false : true
                              }
                              id="multiSetStatus"
                              aria-label="Default select example"
                              onChange={(event) => {
                                handleUpdateStatusMultiAdmin(event, listCheck);
                              }}
                            >
                              <option>Huỷ</option>
                              <option value="1">Đang hoạt động</option>
                              <option value="0">Đình chỉ</option>
                            </Form.Select>
                          </span>
                        )}
                      </th>
                      <th
                        className="text-left position-relative headTable-Set"
                        style={{
                          padding: "auto",
                          textAlign: "left",
                          borderLeft: "none",
                        }}
                      >
                        <span style={{ paddingTop: "15px", float: "left" }}>
                          Email
                        </span>
                        {adminLogined.admin_id == 1 && (
                          <div style={{ float: "right" }}>
                            {" "}
                            <Button
                              variant="light"
                              onClick={() => {
                                handleShow();
                                setIsAddingAdmin(true);
                              }}
                              style={{
                                height: "35px",
                                paddingBottom: "-20px",
                                marginTop: "5px",
                                backgroundColor: "#DDDDDD",
                              }}
                            >
                              Thêm quản trị viên
                            </Button>
                          </div>
                        )}
                      </th>
                      <th className="text-center">Ngày tạo tài khoản</th>

                      {errorRole.length > 0 ? (
                        <th className="text-center">{errorRole}</th>
                      ) : (
                        <th className="text-center">Trạng thái tài khoản</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>{adminsCard}</tbody>
                </Table>

                {PaginationSet()}
              </>

              <>
                {/* modal */}
                <Modal size="lg" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {isAddingAdmin
                        ? "Thêm quản trị viên"
                        : "Thông tin quản trị viên"}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="text-center">
                    {/* {adminShowing && adminInfo(adminShowing)} */}

                    {isAddingAdmin
                      ? adminInfo(newAdmin)
                      : adminShowing && adminInfo(adminShowing)}
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

export default ManageAdmin;
