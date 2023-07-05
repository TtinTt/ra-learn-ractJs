import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo from "../imgs/Logo.png";
import { logoutUser } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { inputSearchBox } from "../actions/productAction";
import { TruncateString, CheckLink } from "../function/functionData";
import Badge from "react-bootstrap/Badge";

function UserButton({ link, handleLogout }) {
  let countCart = 0;
  let cart = [];
  let userLogined = useSelector((state) => state.userReducer.userLogined);

  // kiểm tra userLogined không phải là null hoặc undefined
  if (userLogined && Array.isArray(userLogined.cart)) {
    userLogined.cart.map((product) => {
      countCart = countCart + product.quantity;
    });
  }

  if (link === "/login") {
    return (
      <Navbar.Brand className="d-flex">
        <Link to="/register">
          <Button variant="outline-dark">Đăng ký</Button>
        </Link>
      </Navbar.Brand>
    );
  } else if (link === "/register" || (link === "/" && userLogined == null)) {
    return (
      <Navbar.Brand className="d-flex">
        <Link to="/login">
          <Button variant="outline-dark">Đăng nhập</Button>
        </Link>
      </Navbar.Brand>
    );
  } else if (
    link !== "/login" &&
    link !== "/register" &&
    userLogined !== null
  ) {
    return (
      <div
        style={{
          position: "relative ",
          top: "4px",
        }}
      >
        <Link to="/profile">
          <p
            style={{
              position: "relative ",
              top: "6px",
              left: "0px",
              display: "inline-block",
            }}
          >
            Xin chào
            <Button
              variant="link"
              style={{
                fontSize: "19px",
                position: "relative ",
                top: "-4px",
                left: "-7px",
              }}
            >
              {userLogined.Fname == ""
                ? TruncateString(userLogined.email, 9)
                : TruncateString(userLogined.Fname, 12)}
            </Button>
          </p>
        </Link>

        <Link to="/cart">
          <Button style={{ marginRight: "2px" }} variant="secondary">
            Giỏ hàng{" "}
            <Badge bg={countCart > 0 ? "danger" : "dark"}>{countCart}</Badge>
          </Button>
        </Link>

        <Link to="/">
          <Button onClick={handleLogout} variant="outline-secondary">
            Đăng xuất
          </Button>
        </Link>
      </div>
    );
  }

  return null;
}
export default UserButton;
