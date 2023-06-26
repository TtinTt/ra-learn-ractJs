import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantityCart,
  decrementQuantityCart,
  deleteProductCart,
  saveProductCart,
} from "../actions/CartAction";
import React, { useState } from "react";
import "./Components.css";
import { Link } from "react-router-dom";

export default function Cart() {
  // lấy về state.todos từ store
  let cart = useSelector((state) => state.cartReducer.cart);
  let isSaved = useSelector((state) => state.cartReducer.isSaved);

  const dispatch = useDispatch();
  const handleIncrementCart = async (productID) => {
    dispatch(incrementQuantityCart(productID));
    await console.log(productID);
  };
  const handleDecrementCart = async (productID) => {
    dispatch(decrementQuantityCart(productID));
    await console.log(productID);
  };
  const handleDelete = async (productID) => {
    dispatch(deleteProductCart(productID));
    await console.log(productID);
  };
  const handleSave = async (cart) => {
    dispatch(saveProductCart(cart));
    await console.log("saved");
  };
  const cartProducts = cart.map((product, index) => {
    return (
      <tr className="cartInfo">
        <td style={{ width: "5%" }}>{index + 1}</td>
        <td style={{ width: "30%" }}>
          <div className="groupImg">
            <img className="productPhotoThumb" src={product.photo}></img>
            <h5> {product.title}</h5>{" "}
          </div>
        </td>
        <td style={{ width: "10%" }}>{product.price}</td>
        <td style={{ width: "25%" }}>
          <div className="groupQ">
            <p className="priceP">{product.quantity}</p>
            <div className="buttonQ">
              <button onClick={() => handleDecrementCart(product.id)}>-</button>
              <button
                style={{ marginLeft: "3px" }}
                onClick={() => handleIncrementCart(product.id)}
              >
                +
              </button>
            </div>
          </div>
        </td>
        <td style={{ width: "10%" }}>{product.quantity * product.price}</td>
        <td style={{ width: "25%" }}>
          {/* <button onClick={() => handleComplete(product)}>Update</button> */}
          <button
            className="buttonMain"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  let cartQlt = 0;
  let cartSum = 0;

  cart.forEach((product) => {
    cartQlt = cartQlt + product.quantity;
    cartSum = cartSum + product.quantity * product.price;
  });

  return (
    <div className="List-Cart">
      <h1>
        Your cart{" "}
        <span>
          <Link to="/" className="float-end">
            <button style={{}} className="buttonHome">
              Home
            </button>
          </Link>
        </span>
      </h1>

      <div className="scrollTb">
        <div className="tableScroll">
          <table>
            <thead>
              <tr>
                <th style={{ width: "5%" }}>#</th>
                <th style={{ width: "30%", textAlign: "left" }}>Name</th>
                <th style={{ width: "10%" }}>Price</th>
                <th style={{ width: "25%" }}>Quantity</th>
                <th style={{ width: "10%" }}>Total</th>
                <th style={{ width: "25%" }}>Action</th>
              </tr>
            </thead>
            <tbody>{cartProducts}</tbody>
          </table>
        </div>
      </div>
      <div className="footerCart">
        {" "}
        {cart.length == 0 ? (
          <p>Empty product in your cart</p>
        ) : (
          <p>
            There are <span>{cartQlt}</span> items in your cart:{" "}
            <span>{cartSum}</span> USD
          </p>
        )}
        {isSaved ? (
          <p
            style={{
              color: "grey",
              letterSpacing: "1px",
              marginBottom: "44px",
            }}
          >
            Your order has been saved!
          </p>
        ) : (
          <button
            onClick={() => handleSave(cart)}
            style={{ width: "230px", marginBottom: "30px" }}
            className="buttonMain"
          >
            Update Order
          </button>
        )}
      </div>
    </div>
  );
}
