import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Changedot, getCurrentTimeString } from "../../function/functionData";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";

import "../../css/Cart.css";

export default function ManageProduct() {
  const navigate = useNavigate();

  return <>ManageProduct</>;
}
