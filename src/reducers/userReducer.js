import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer(
  { users: [] },
  {
    SHOW_USER: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  }
);

export default userReducer;
