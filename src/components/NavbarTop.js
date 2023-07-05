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
import UserButton from "./UserButton";

function NavbarTop() {
  let userLogined = useSelector((state) => state.userReducer.userLogined);
  let link = CheckLink();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    console.log("LOGOUT");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar-top">
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
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Navbar.Brand className="d-flex">
            <UserButton link={link} handleLogout={handleLogout} />
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
