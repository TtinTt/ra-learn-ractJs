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
import { inputSearchMess } from "../actions/messAction";
import { FormLabel } from "react-bootstrap";
import { filterMess } from "../actions/messAction";

function MessFilter() {
  let valueSearch = useSelector((state) => state.orderReducer.searchFilter);

  const [sort, setSort] = useState(2); // Giá trị mặc định

  const [searchValue, setSearchValue] = useState(""); // Giá trị mặc định

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inputSearchMess(""));
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
    dispatch(inputSearchMess(event.target.value));
  };
  const setFilterMess = () => {
    if (sort == "2") {
      return "Tất cả";
    } else if (sort == 1) {
      return "Chưa phản hồi";
    } else if (sort == 0) {
      return "Đã phản hồi";
    }
  };

  const changeFilter = (value) => {
    setSort(Number(value));
    dispatch(filterMess(Number(value)));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-filter">
      <Container fluid id="navbarScrollContainer">
        {/* <Navbar.Brand href="#">Lọc sản phẩm</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div id="groupSortMaxPrice">
            <h5 className="text-center ">Danh sách lời nhắn</h5>
          </div>
          <div id="groupSearchProduct">
            {" "}
            <Nav className="d-flex position-relative" style={{ top: "0px" }}>
              {" "}
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
                title={setFilterMess()}
                id="input-group-dropdown-3"
                align="end"
              >
                <Dropdown.Item onClick={() => changeFilter(2)} href="#">
                  Tất cả
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeFilter(1)} href="#">
                  Chưa phản hồi{" "}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeFilter(0)} href="#">
                  Đã phản hồi{" "}
                </Dropdown.Item>
              </DropdownButton>
            </Nav>
            <Nav
              className="d-flex position-relative"
              style={{ top: "8px" }}
            ></Nav>
            <OverlayTrigger
              key={"left"}
              placement={"left"}
              overlay={
                <Tooltip id={`tooltip-left`}>
                  Tìm kiếm theo{" "}
                  <strong>email, tên, số điện thoại khách hàng </strong> hoặc{" "}
                  <strong>trạng thái phản hồi</strong>
                </Tooltip>
              }
            >
              <Navbar.Brand className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm lời nhắn"
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

export default MessFilter;
