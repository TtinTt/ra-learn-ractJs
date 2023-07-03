import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import BoxLogin from "../components/BoxLogin";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

function Login() {
  return (
    <Container>
      <NavbarTop></NavbarTop>
      <BoxLogin />
      <FooterBot></FooterBot>
    </Container>
  );
}

export default Login;
