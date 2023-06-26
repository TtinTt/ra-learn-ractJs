import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  addToCart,
} from "../actions/productsAction";
import React, { useState } from "react";
import "./Components.css";
import { Link } from "react-router-dom";

export default function Products() {
  // lấy về state.todos từ store
  const products = useSelector((state) => state.listProductReducer.products);
  let cart = useSelector((state) => state.cartReducer.cart);

  let isAdmin = true;
  const dispatch = useDispatch();

  const handleIncrement = async (productID) => {
    dispatch(incrementQuantity(productID));
    await console.log(productID);
  };
  const handleDecrement = async (productID) => {
    dispatch(decrementQuantity(productID));
    await console.log(productID);
  };

  const handleATC = async (product) => {
    await dispatch(addToCart(product));
    await console.log(product);
  };
  let cartQlt = 0;

  cart.forEach((product) => {
    cartQlt = cartQlt + product.quantity;
    // cartSum = cartSum + product.quantity * product.price;
  });
  const productlist = products.map((product) => {
    return (
      <tr className="productInfo">
        <td>
          <img className="productPhoto" src={product.photo}></img>
        </td>
        <td>
          <h4 className="tittleProduct">{product.title}</h4>
          <p className="productDes">{product.description}</p>
        </td>
        <td>
          <div className="groupQ">
            <p className="priceP">{product.quantity}</p>
            <div className="buttonQ">
              <button onClick={() => handleDecrement(product.id)}>-</button>
              <button
                style={{ marginLeft: "3px" }}
                onClick={() => handleIncrement(product.id)}
              >
                +
              </button>
            </div>
          </div>

          <button className="buttonMain" onClick={() => handleATC(product)}>
            {product.quantity * product.price} USD
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="List-Products">
      <h1>
        List Products
        {isAdmin == true && (
          <span>
            <Link to="/manage-product" className="float-end">
              <button className="buttonTopbar">Manage Product</button>
            </Link>
          </span>
        )}
        <span>
          <Link to="/cart" className="float-end">
            <button className="buttonTopbar">Your Cart ({cartQlt})</button>
          </Link>
        </span>
      </h1>
      <div>
        <table>
          <thead style={{ color: "salmon" }}>
            <tr>
              <th style={{ width: "60px" }}>Photo</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          {productlist}
        </table>
      </div>
    </div>
  );
}
