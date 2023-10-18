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
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import AboutUsPage from "./pages/AboutUsPage";
import QnAPage from "./pages/QnAPage";
import ResetPass from "./pages/ResetPass";

import AboutProductPage from "./pages/AboutProductPage";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import Profile from "./pages/Profile";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  TruncateString,
  CheckLink,
  useGetTagsProducts,
  useGetProductsByTags,
  Changedot,
} from "../src/function/functionData";
import { useEffect, useState } from "react";
import productApi from "./apis/product.api";
function App() {
  const state = useSelector((state) => state);
  let adminLogined = useSelector((state) => state.adminReducer.adminLogined);

  useEffect(() => {
    localStorage.setItem("reduxState", JSON.stringify(state));
  }, [state]);

  // let tagsProducts = useGetTagsProducts();

  const getTag = async () => {
    // const navigate = useNavigate();
    // setLoading(true);

    await productApi
      .getTag({})
      .then((data) => {
        console.log("1-lấy các tag", data.tags);
        // setValue(data.maxPrice);
        // setMinPrice(data.minPrice);
        // setMaxPrice(data.maxPrice);
        setTagsProducts(data.tags);
        console.log("data.tags", data.tags);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 401) {
          console.log(error.response?.statusText);
          // navigate("/products");
        } else {
          console.log(error.response?.statusText);
        }
      });

    // setSelectedProductIds([]);
  };
  const [tagsProducts, setTagsProducts] = useState([]);

  useEffect(() => {
    getTag();
  }, []);

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
      <Route path="/resetPass" element={<ResetPass />} />
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
        // element={adminLogined == null && <AdminLogin />}
      />
      {catalogue}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
