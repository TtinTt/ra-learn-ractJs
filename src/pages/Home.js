import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import NavbarFilter from "../components/NavbarFilter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

function Home() {
  return (
    <Container>
      <NavbarTop></NavbarTop>
      <NavbarFilter></NavbarFilter>
      <ProductList />
      <FooterBot></FooterBot>
    </Container>
  );
}

export default Home;
