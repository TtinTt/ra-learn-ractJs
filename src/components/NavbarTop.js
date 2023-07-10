import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../imgs/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputSearchBox } from "../actions/productAction";
import {
  TruncateString,
  CheckLink,
  useGetTagsProducts,
  useGetProductsByTags,
} from "../function/functionData";
import UserButton from "./UserButton";

function NavbarTop() {
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  const navigate = useNavigate();

  let link = CheckLink();
  const dispatch = useDispatch();

  // lấy list không trùng lặp tag đầu tiên của mỗi sản phẩm
  let tagsProducts = useGetTagsProducts();

  const carouselItem = tagsProducts.map((tag) => {
    let urlLink = "/" + tag;
    return (
      <NavDropdown.Item href={urlLink}>
        {tag.toLocaleUpperCase()}{" "}
      </NavDropdown.Item>
    );
  });

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary navbar-top"
      style={{ zIndex: "800" }}
    >
      <Link to="/">
        <div className="logo-set-small">
          <img
            id="icon-logo"
            style={{ width: "100px", height: "60px", marginLeft: "10px" }}
            src={logo}
            alt="cozy"
          />
        </div>
      </Link>

      <Container fluid>
        {/* <Navbar.Brand href="#">Bộ sưu tập:</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Trang chủ</Nav.Link>
            <Nav.Link href="/aboutUs">Về chúng tôi</Nav.Link>
            <Nav.Link href="/aboutProduct">Sản phẩm</Nav.Link>
            <Nav.Link href="/contactUs">Liên hệ</Nav.Link>

            <NavDropdown title="Bộ sưu tập" id="navbarScrollingDropdown">
              {carouselItem}
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Navbar.Brand className="d-flex">
            <UserButton link={link} />
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
