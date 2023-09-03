import { createReducer } from "@reduxjs/toolkit";

const adminReducer = createReducer(
  {
    adminLogined: null,
    // admins: [
    //   {
    //     email: "demoAdmin1@gmail.com",
    //     password: "demoAdmin1@gmail.com",
    //   },
    //   {
    //     email: "demoAdmin2@gmail.com",
    //     password: "demoAdmin2@gmail.com",
    //   },
    // ],
    admins: [],
  },
  {
    LOGIN_ADMIN: (state, action) => {
      return {
        ...state,
        adminLogined: action.payload,
      };
    },
    LOGOUT_ADMIN: (state, action) => {
      return {
        ...state,
        adminLogined: null,
      };
    },
  }
);

export default adminReducer;
