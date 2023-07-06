import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import CartList from "../components/CartList";
import Container from "react-bootstrap/Container";
import NotFound from "../components/NotFound";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

function PageNotFound() {
  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <NotFound />

      <FooterBot />
    </Container>
  );
}

export default PageNotFound;
