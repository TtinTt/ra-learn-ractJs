import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

function Cart() {
  return (
    <Container>
      <NavbarTop></NavbarTop>
      <CartProduct />
      <FooterBot></FooterBot>
    </Container>
  );
}

export default Cart;
