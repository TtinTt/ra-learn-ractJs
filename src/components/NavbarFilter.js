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
import { FormLabel } from "react-bootstrap";

function NavbarFilter() {
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  let productList = useSelector((state) => state.productReducer.products);

  const [sort, setSort] = useState(0); // Giá trị mặc định

  let link = CheckLink();

  useEffect(() => {
    dispatch(inputSearchBox(""));
  }, []);

  const dispatch = useDispatch();

  const changeSort = (value) => {
    setSort(value);
    dispatch(sortProducts(value));
  };

  const sortValue = () => {
    if (sort == 0) {
      return "Mới nhất";
    } else if (sort == 1) {
      return "Giá giảm dần";
    } else if (sort == 2) {
      return "Giá tăng dần";
    }
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    // console.log("LOGOUT");
  };

  // lấy giá trị price lớn nhất và nhỏ nhất của listProduct
  const minMaxPrice = (productList) => {
    if (productList.length === 0) {
      return null; // Trả về null nếu mảng productListInput rỗng
    }

    let minPrice = productList[0].price;
    let maxPrice = productList[0].price;

    for (let i = 1; i < productList.length; i++) {
      const price = productList[i].price;
      if (price < minPrice) {
        minPrice = price;
      }
      if (price > maxPrice) {
        maxPrice = price;
      }
    }

    return [minPrice, maxPrice];
  };

  let [minPrice, maxPrice] = minMaxPrice(productList);
  const [value, setValue] = useState(maxPrice); // Giá trị mặc định

  useEffect(() => {
    dispatch(priceFrom(maxPrice));
  }, [maxPrice]);

  // filter

  const handleChangePriceFrom = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    dispatch(priceFrom(newValue));
  };

  // lấy dữ liệu search
  const handleGetInput = async (event) => {
    dispatch(inputSearchBox(event.target.value));
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-filter">
      <Container fluid id="navbarScrollContainer">
        {/* <Navbar.Brand href="#">Lọc sản phẩm</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div id="groupSortMaxPrice">
            <Nav className="d-flex">
              <label for="setMaxPrice" id="setMaxPriceLabel">
                Giá tối đa{" "}
                <span style={{ color: "#dc3545" }}>{Changedot(value)}</span>
              </label>
            </Nav>
            <Nav className="d-flex">
              <Form.Range
                id="setMaxPriceRange"
                min={minPrice}
                max={maxPrice}
                step={(maxPrice - minPrice) * 0.1}
                value={value}
                onChange={handleChangePriceFrom}
              />{" "}
            </Nav>{" "}
          </div>
          <div id="groupSearchProduct">
            {" "}
            <Nav className="d-flex position-relative" style={{ top: "8px" }}>
              <InputGroup
                className="mb-3 "
                style={{ display: "flex", flexWrap: "noWrap" }}
              >
                <Form.Control
                  placeholder="Sắp xếp theo"
                  for="input-group-dropdown-2"
                  disabled
                  aria-label="Text input with dropdown button"
                  className="sortStatus"
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={sortValue()}
                  id="input-group-dropdown-2"
                  align="end"
                >
                  <Dropdown.Item onClick={() => changeSort(0)} href="#">
                    Mới nhất
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeSort(1)} href="#">
                    Giá giảm dần
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeSort(2)} href="#">
                    Giá tăng dần
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Nav>
            <Navbar.Brand className="d-flex">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm sản phẩm"
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

export default NavbarFilter;
