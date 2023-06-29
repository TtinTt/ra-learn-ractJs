import JobList from "../components/JobList";
import JobDetal from "../components/JobDetal";
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
      <Container>
        <Row>
          <Col className="leftBundle" sm={4}>
            <JobList />
          </Col>
          <Col className="rightBundle" sm={8}>
            <JobDetal />
          </Col>
        </Row>
      </Container>
      <FooterBot></FooterBot>
    </>
  );
}

export default Home;
