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
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Changedot, CheckLink } from "../function/functionData";
import {
  sortProducts,
  priceFrom,
  inputSearchBox,
} from "../actions/productAction";
import { FormLabel } from "react-bootstrap";
import { filterOrder, inputSearchOrder } from "../actions/orderAction";
function OrderFilter() {
  let valueSearch = useSelector((state) => state.orderReducer.searchFilter);

  const [sort, setSort] = useState(0); // Giá trị mặc định

  const [searchValue, setSearchValue] = useState(""); // Giá trị mặc định

  const dispatch = useDispatch();

  const changeFilter = (value) => {
    setSort(value);
    dispatch(filterOrder(value));
  };

  useEffect(() => {
    dispatch(inputSearchOrder(""));
    dispatch(filterOrder(0));
  }, []);

  const setFilterOrder = () => {
    if (sort == 0) {
      return "Tất cả";
    } else if (sort == 1) {
      return "Chưa hoàn thành";
    } else if (sort == 2) {
      return "Đã hoàn thành";
    }
  };

  // lấy dữ liệu search
  const handleGetInput = (event) => {
    dispatch(inputSearchOrder(event.target.value));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-filter">
      <Container fluid id="navbarScrollContainer">
        {/* <Navbar.Brand href="#">Lọc sản phẩm</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div id="groupSortMaxPrice">
            <h5 className="text-center ">Danh sách đơn hàng</h5>
          </div>
          <div id="groupSearchProduct">
            {" "}
            <Nav className="d-flex position-relative" style={{ top: "8px" }}>
              <InputGroup
                className="mb-3 "
                style={{ display: "flex", flexWrap: "noWrap" }}
              >
                <Form.Control
                  placeholder="Hiển thị"
                  for="input-group-dropdown-2"
                  disabled
                  aria-label="Text input with dropdown button"
                  className="sortStatus2"
                  // style={{ width: "155px !important" }}
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={setFilterOrder()}
                  id="input-group-dropdown-3"
                  align="end"
                >
                  <Dropdown.Item onClick={() => changeFilter(0)} href="#">
                    Tất cả
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeFilter(1)} href="#">
                    Chưa hoàn thành
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeFilter(2)} href="#">
                    Đã hoàn thành
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Nav>
            <OverlayTrigger
              key={"left"}
              placement={"left"}
              overlay={
                <Tooltip id={`tooltip-left`}>
                  Tìm kiếm theo <strong>email, tên </strong> hoặc{" "}
                  <strong>số điện thoại khách hàng</strong>
                </Tooltip>
              }
            >
              <Navbar.Brand className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm đơn hàng"
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

export default OrderFilter;
