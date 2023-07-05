import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { inputSearchBox } from "../actions/productAction";

function BuyerInfo() {
  // let userLogined = useSelector((state) => state.userReducer.userLogined);

  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   console.log("LOGOUT");
  // };

  // // lấy dữ liệu search
  // const handleGetInput = async (event) => {
  //   dispatch(inputSearchBox(event.target.value));
  // };

  return <p>buyer info</p>;
}

export default BuyerInfo;
