import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BuyerProfile from "./pages/BuyerProfile";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/profile" element={<ProfileUser />} /> */}
      <Route path="/userProfile" element={<BuyerProfile />} />
    </Routes>
  );
}

export default App;
