import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantityCart,
  decrementQuantityCart,
  deleteProductCart,
} from "../actions/CartAction";
import React, { useState } from "react";
import "./Components.css";

export default function Cart() {
  let isSave = true;

  // lấy về state.todos từ store
  let cart = useSelector((state) => state.cartReducer.cart);
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
  const cartProducts = cart.map((product, index) => {
    return (
      <tr className="cartInfo">
        <td style={{ width: "5%" }}>{index + 1}</td>
        <td style={{ width: "25%" }}>{product.title}</td>
        <td style={{ width: "10%" }}>{product.price}</td>
        <td style={{ width: "25%" }}>
          <div className="groupQ">
            <h3 className="priceP">{product.quantity}</h3>
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
        <td style={{ width: "15%" }}>{product.quantity * product.price}</td>
        <td style={{ width: "20%" }}>
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

  let handleCheckSave = () => {
    let savedData = JSON.parse(localStorage.getItem("cart")) ?? [];
    if (savedData == cart) {
      isSave = true;
    } else {
      isSave = false;
    }
  };

  let handleSave = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    handleCheckSave();
  };

  let cartQlt = 0;
  let cartSum = 0;

  cart.forEach((product) => {
    cartQlt = cartQlt + product.quantity;
    cartSum = cartSum + product.quantity * product.price;
    handleCheckSave();
  });

  return (
    <div className="List-Cart">
      <h1>Your cart</h1>
      <table>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "25%" }}>Name</th>
            <th style={{ width: "10%" }}>Price</th>
            <th style={{ width: "25%" }}>Quantity</th>
            <th style={{ width: "15%" }}>Subtotal</th>
            <th style={{ width: "20%" }}>Action</th>
          </tr>
        </thead>
        <tbody>{cartProducts}</tbody>
      </table>

      {cart.length == 0 ? (
        <h2>Empty product in your cart</h2>
      ) : (
        <h2>
          There are <span>{cartQlt}</span> items in your cart:{" "}
          <span>{cartSum}</span> USD
        </h2>
      )}

      {isSave ? (
        <p>saved</p>
      ) : (
        <button
          onClick={() => handleSave()}
          style={{ width: "90px" }}
          className="buttonMain"
        >
          Update Cart
        </button>
      )}
    </div>
  );
}
