import { createAction } from "@reduxjs/toolkit";

// export const addToCart = createAction("ADD_TO_CART");
// export const deleteFromCart = createAction("DELETE_FROM_CART");
// // export const changeQuantity = createAction("CHANGE_QUANTITY");

// export const changeQuantity = (id, quantity) => ({
//   type: "CHANGE_QUANTITY",
//   payload: { id, quantity },
// });
export const createOrder = createAction("CREATE_ORDER");

export const cancelOrder = createAction("CANCEL_ORDER");
export const updateStatusOrder = createAction("UPDATE_STATUS_ORDER");
export const filterOrder = createAction("FILTER_ORDER");
export const inputSearchOrder = createAction("SEARCH_ORDER");
