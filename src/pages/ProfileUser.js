import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

function Register() {
  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <UserInfo />
      <FooterBot />
    </Container>
  );
}

export default Register;
