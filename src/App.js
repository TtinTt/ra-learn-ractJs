import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChangePass from "./pages/ChangePass";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ContactUs from "./pages/ContactUs";
import PageNotFound from "./pages/PageNotFound";
import Admin from "./pages/admin/admin";
import AdminLogin from "./pages/admin/adminLogin";
import AboutUsPage from "./pages/AboutUsPage";
import QnAPage from "./pages/QnAPage";
import AboutProductPage from "./pages/AboutProductPage";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import Profile from "./pages/Profile";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  TruncateString,
  CheckLink,
  useGetTagsProducts,
  useGetProductsByTags,
  Changedot,
} from "../src/function/functionData";

function App() {
  const state = useSelector((state) => state);
  let adminLogined = useSelector((state) => state.adminReducer.adminLogined);

  useEffect(() => {
    localStorage.setItem("reduxState", JSON.stringify(state));
  }, [state]);

  let tagsProducts = useGetTagsProducts();

  const catalogue = tagsProducts.map((tag) => {
    // console.log(tag);
    let urlLink = "/" + tag.toLocaleLowerCase();
    return <Route path={urlLink} element={<Home />} />;
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changePass" element={<ChangePass />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/aboutUs" element={<AboutUsPage />} />
      <Route path="/QnA" element={<QnAPage />} />
      <Route path="/aboutProduct" element={<AboutProductPage />} />

      <Route
        path="/admin"
        element={adminLogined == null ? <AdminLogin /> : <Admin />}
      />
      {catalogue}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
