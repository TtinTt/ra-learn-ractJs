import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ContactUs from "./pages/ContactUs";
import PageNotFound from "./pages/PageNotFound";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import Profile from "./pages/Profile";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const state = useSelector((state) => state);
  let adminLogined = useSelector((state) => state.adminReducer.adminLogined);

  useEffect(() => {
    localStorage.setItem("reduxState", JSON.stringify(state));
  }, [state]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route
        path="/admin"
        element={adminLogined == null ? <AdminLogin /> : <Admin />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
