import "./App.css";
import Cart from "./components/Cart";
import ManageProduct from "./components/ManageProduct";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/manage-product" element={<ManageProduct />} />
    </Routes>
  );
}

export default App;
