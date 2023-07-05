import { createAction } from "@reduxjs/toolkit";

export const addToCart = (cart) => {
  let userLogined = JSON.parse(localStorage.getItem("userLogined"));
  userLogined = { ...userLogined, cart };
  localStorage.setItem("userLogined", JSON.stringify(userLogined));

  return {
    type: "ADD_TO_CART",
    payload: cart,
  };
};

export const deleteFromCart = createAction("DELETE_FROM_CART");

export const changeQuantity = (id, quantity) => {
  return {
    type: "CHANGE_QUANTITY",
    payload: {
      id: id,
      quantity: quantity,
    },
  };
};
