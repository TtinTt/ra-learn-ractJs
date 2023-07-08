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
import { Changedot, CheckLink } from "../function/functionData";
import {
  sortProducts,
  priceFrom,
  inputSearchBox,
} from "../actions/productAction";
import { inputSearchMess } from "../actions/messAction";

import { FormLabel } from "react-bootstrap";
function MessFilter() {
  let valueSearch = useSelector((state) => state.orderReducer.searchFilter);

  const [sort, setSort] = useState(0); // Giá trị mặc định

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
            <Nav
              className="d-flex position-relative"
              style={{ top: "8px" }}
            ></Nav>
            <Navbar.Brand className="d-flex">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm người dùng"
                // className="me-2"
                aria-label="Search"
                onChange={handleGetInput}
              />
            </Navbar.Brand>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MessFilter;
