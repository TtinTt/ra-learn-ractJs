import NavbarTop from "../../components/NavbarTop";
import FooterBot from "../../components/FooterBot";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AdminLoginBox from "../../components/admin/adminLoginBox";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../../css/Home.css";

function AdminLogin() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <AdminLoginBox />

      <FooterBot />
    </Container>
  );
}

export default AdminLogin;
