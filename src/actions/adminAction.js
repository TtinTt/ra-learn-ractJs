import { createAction } from "@reduxjs/toolkit";

// export const addToCart = createAction("ADD_TO_CART");
// export const deleteFromCart = createAction("DELETE_FROM_CART");
// export const changeQuantity = createAction("CHANGE_QUANTITY");

// export const changeQuantity = (id, quantity) => ({
//   type: "CHANGE_QUANTITY",
//   payload: { id, quantity },
// });

export const loginAdmin = createAction("LOGIN_ADMIN");
export const logoutAdmin = createAction("LOGOUT_ADMIN");
export const updateEditProduct = createAction("EDIT_PRODUCT");
export const addProduct = createAction("ADD_PRODUCT");
export const deleteProduct = createAction("DELETE_PRODUCT");
export const inputSearchUser = createAction("SEARCH_USER");
