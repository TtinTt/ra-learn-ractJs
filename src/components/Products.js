import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  addToCart,
} from "../actions/productsAction";
import React, { useState } from "react";

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
    addToCart(addToCart(product));
    await console.log(product);
  };

  const productlist = products.map((product) => {
    return (
      <tr>
        <td>
          <img src={product.photo}></img>
        </td>
        <td>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </td>
        <td>
          <input value={product.quantity}></input>
          <div>
            <button onClick={() => handleDecrement(product.id)}>-</button>

            <button onClick={() => handleIncrement(product.id)}>+</button>
          </div>
          <button onClick={() => handleATC(product)}>
            {product.quantity * product.price} USD
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>List Products</h1>
      <div>{productlist}</div>
    </div>
  );
}
