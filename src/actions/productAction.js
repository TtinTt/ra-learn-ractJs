import { createAction } from "@reduxjs/toolkit";

export const showProduct = createAction("SHOW_PRODUCT");

export const inputSearchBox = createAction("SEARCH_BOX");

export const addToCart = (cart) => {
  let userLogined = JSON.parse(localStorage.getItem("userLogined"));
  userLogined = { ...userLogined, cart };
  localStorage.setItem("userLogined", JSON.stringify(userLogined));

  return {
    type: "ADD_TO_CART",
    payload: cart,
  };
};
