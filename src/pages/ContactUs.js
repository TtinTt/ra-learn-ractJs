import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import { Link } from "react-router-dom";
import CartList from "../components/CartList";
import Container from "react-bootstrap/Container";
import ContactUsBox from "../components/ContactUsBox";

import "../css/Home.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

function ContactUs() {
  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <ContactUsBox />

      <FooterBot />
    </Container>
  );
}

export default ContactUs;
