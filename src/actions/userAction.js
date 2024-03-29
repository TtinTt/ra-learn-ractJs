import { createAction } from "@reduxjs/toolkit";

export const registerUser = (user) => {
  // // lấy useDB từ localStorage
  // let usersDB = JSON.parse(localStorage.getItem("users"));
  // // push user vào useDB
  // usersDB = [...usersDB, user];
  // // đẩy useDB lên lại localStorage
  // localStorage.setItem("users", JSON.stringify(usersDB));

  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const loginUser = (user) => {
  // lấy useDB từ localStorage

  // localStorage.setItem("userLogined", JSON.stringify(user));

  return {
    type: "LOGIN_USER",
    payload: user,
  };
};

export const logoutUser = () => {
  // gỡ userLogined từ localStorage

  localStorage.removeItem("userLogined");

  return {
    type: "LOGOUT_USER",
    payload: null,
  };
};

export const clearCart = createAction("CLEAR_CART");
export const updateInfoUser = createAction("UPDATE_INFO");
export const updateStatusUser = createAction("UPDATE_STATUS_USER");
export const changePassUser = createAction("CHANGE_PASSWORD_USER");
