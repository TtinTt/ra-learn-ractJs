import NavbarTop from "../../components/NavbarTop";
import FooterBot from "../../components/FooterBot";
import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AdminBox from "../../components/Admin/AdminBox";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import ManageProduct from "../../components/Admin/ManageProduct";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "../../css/Home.css";

function Admin() {
  const navigate = useNavigate();
  let [showing, setShowing] = useState(1);
  const [key, setKey] = useState("admin");

  return (
    <Container>
      <div className="navbar">
        <NavbarTop />
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="admin" title="admin">
          <AdminBox />{" "}
        </Tab>
        <Tab eventKey="products" title="products">
          <ManageProduct />{" "}
        </Tab>
        <Tab eventKey="user" title="user">
          <></>
        </Tab>
        {/* <Tab eventKey="contact" title="Contact" disabled>
          Tab content for Contact
        </Tab> */}
      </Tabs>

      <FooterBot />
    </Container>
  );
}

export default Admin;
