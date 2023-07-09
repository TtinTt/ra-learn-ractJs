import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { createOrder } from "../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, changeQuantity } from "../actions/cartAction";
import { Changedot } from "../function/functionData";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { getCurrentTimeString } from "../function/functionData";
import Modal from "react-bootstrap/Modal";

import "../css/Cart.css";

import { clearCart } from "../actions/userAction";
function NotFound() {
  return (
    <div className="imgPageTop">
      <h1 className="text-center msgPageTop">Trang không tồn tại.</h1>
    </div>
  );
}

export default NotFound;
