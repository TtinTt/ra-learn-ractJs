import { createAction } from "@reduxjs/toolkit";


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

export const sortProducts = createAction("SORT_PRODUCTS");

export const priceFrom = createAction("SORT_PRICE_FROM");
