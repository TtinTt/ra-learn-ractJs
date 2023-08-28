import { useEffect, useState } from "react";
import React from "react";
import "../css/NavbarFilter.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import { Changedot, CheckLink } from "../function/functionData";
import {
  sortProducts,
  priceFrom,
  inputSearchBox,
} from "../actions/productAction";
import { inputSearchUser } from "../actions/adminAction";
import { filterUser } from "../actions/userAction";
import { FormLabel } from "react-bootstrap";
function UserFilter() {
  //
  const changeFilter = (value) => {
    setSort(Number(value));
    dispatch(filterUser(Number(value)));
  };

  let valueSearch = useSelector((state) => state.orderReducer.searchFilter);

  const [sort, setSort] = useState(2); // Giá trị mặc định

  const [searchValue, setSearchValue] = useState(""); // Giá trị mặc định

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inputSearchUser(""));
  }, []);

  const setFilterOrder = () => {
    if (sort == 2) {
      return "Tất cả";
    } else if (sort == 1) {
      return "Đang hoạt động";
    } else if (sort == 0) {
      return "Đình chỉ";
    }
  };

  // lấy dữ liệu search
  const handleGetInput = (event) => {
    dispatch(inputSearchUser(event.target.value));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-filter">
      <Container fluid id="navbarScrollContainer">
        {/* <Navbar.Brand href="#">Lọc sản phẩm</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div id="groupSortMaxPrice">
            <h5 className="text-center ">Danh sách người dùng</h5>
          </div>
          <div id="groupSearchProduct">
            {" "}
            <Nav
              className="d-flex position-relative"
              style={{ top: "8px" }}
            ></Nav>
            <DropdownButton
              variant="outline-secondary"
              title={setFilterOrder()}
              id="input-group-dropdown-3"
              align="end"
            >
              <Dropdown.Item onClick={() => changeFilter(2)} href="#">
                Tất cả
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeFilter(1)} href="#">
                Đang hoạt động{" "}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeFilter(0)} href="#">
                Đình chỉ{" "}
              </Dropdown.Item>
            </DropdownButton>
            <OverlayTrigger
              key={"left"}
              placement={"left"}
              overlay={
                <Tooltip id={`tooltip-left`}>
                  Tìm kiếm theo{" "}
                  <strong>email, tên, số điện thoại khách hàng</strong>
                  {/* hoặc{" "}
                  <strong>trạng thái tài khoản</strong> */}
                </Tooltip>
              }
            >
              <Navbar.Brand className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm người dùng"
                  // className="me-2"
                  aria-label="Search"
                  onChange={handleGetInput}
                />
              </Navbar.Brand>
            </OverlayTrigger>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserFilter;
