import ProductList from "../components/ProductList";
import NavbarTop from "../components/NavbarTop";
import FooterBot from "../components/FooterBot";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Home.css";

function Home() {
  return (
    <>
      <NavbarTop></NavbarTop>
      {/* <Container>
        <Row>
          <Col className="leftBundle" sm={4}>
            <ProductList />
          </Col>
          <Col className="rightBundle" sm={8}>
            <ProductDetal />
          </Col>
        </Row>
      </Container> */}
      <ProductList />
      <FooterBot></FooterBot>
    </>
  );
}

export default Home;
