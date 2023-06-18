import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantityCart,
  decrementQuantityCart,
  deleteProductCart,
} from "../actions/CartAction";
import React, { useState } from "react";
import { addToCart } from "../actions/productsAction";

export default function Cart() {
  // lấy về state.todos từ store
  const cart = useSelector((state) => state.cartReducer.cart);

  // cart.forEach((cartvalue) => {
  //   if (cartvalue.id == 1) {
  //     let cart = cartvalue;
  //     let cartID = 1;
  //   }
  // });
  // let cart = cart[0];
  // console.log(cart);
  // let cartID = 1;

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

  // console.log(cart);
  const cartProducts = cart.map((product, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>
          {product.quantity}
          <div>
            <button onClick={() => handleDecrementCart(product.id)}>-</button>
            <button onClick={() => handleIncrementCart(product.id)}>+</button>
          </div>
        </td>
        <td>{product.quantity * product.price}</td>
        <td>
          {/* <button onClick={() => handleComplete(product)}>Update</button> */}
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Your cart</h1>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{cartProducts}</tbody>
      <hr />
      {!cart ?? ((<p>Empty product in your cart</p>), (<hr />))}
      <p>There are ? items in your cart. ??USD</p>
      <p>update?</p>
    </div>
  );
}
