import NavbarTop from "../../components/NavbarTop";
import FooterBot from "../../components/FooterBot";
import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AdminBox from "../../components/admin/adminBox";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ManageUser from "../../components/admin/ManageUser";
import ManageOrder from "../../components/admin/ManageOrder";
import ManageMess from "../../components/admin/ManageMess";
import { useNavigate } from "react-router-dom";
import ManageProduct from "../../components/admin/ManageProduct";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import "../../css/Home.css";

function Admin() {
  const navigate = useNavigate();
  let [showing, setShowing] = useState(1);
  const [key, setKey] = useState("order");

  return (
    <Container>
      <div>
        <NavbarTop />
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="order" title="Đơn hàng">
          <ManageOrder />
        </Tab>
        {/* 
        <Tab eventKey="products" title="Sản phẩm">
          <ManageProduct />
        </Tab>*/}
        <Tab eventKey="admin" title="Người dùng">
          <ManageUser />
        </Tab>
        <Tab eventKey="contact" title="Lời nhắn">
          <ManageMess />
        </Tab>
      </Tabs>

      <FooterBot />
    </Container>
  );
}

export default Admin;
