import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import Order from "../components/OrderList";
import Container from "react-bootstrap/Container";
import BuyerInfo from "../components/BuyerInfo";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

function Cart() {
  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <Order />

      <FooterBot />
    </Container>
  );
}

export default Cart;
