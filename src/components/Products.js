import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  addToCart,
} from "../actions/productsAction";
import React, { useState } from "react";
import "./Components.css";

export default function Products() {
  // lấy về state.todos từ store
  const products = useSelector((state) => state.listProductReducer.products);

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

  const productlist = products.map((product) => {
    return (
      <tr className="productInfo">
        <td>
          <img className="productPhoto" src={product.photo}></img>
        </td>
        <td>
          <h4>{product.title}</h4>
          <p className="productDes">{product.description}</p>
        </td>
        <td>
          <div className="groupQ buttonSet">
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
      <h1>List Products</h1>
      <div>{productlist}</div>
    </div>
  );
}
