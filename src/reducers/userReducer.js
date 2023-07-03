import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer(
  {
    userLogined: JSON.parse(localStorage.getItem("userLogined")) ?? null,
    users: JSON.parse(localStorage.getItem("users")) ?? [
      {
        email: "demoUser1@gmail.com",
        password: "demoUser1@gmail.com",
        Fname: "Tín",
        Lname: "",
        date: "",
        add: "",
        phone: "",
        img: "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif",
      },
      {
        email: "demoUser2@gmail.com",
        password: "demoUser2@gmail.com",
        Fname: "",
        Lname: "",
        date: "",
        add: "",
        phone: "",
        img: "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif",
      },
      {
        email: "demoUser3@gmail.com",
        password: "demoUser3@gmail.com",
        Fname: "",
        Lname: "",
        date: "",
        add: "",
        phone: "",
        img: "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif",
      },
    ],
  },
  {
    ADD_USER: (state, action) => {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    },
    LOGIN_USER: (state, action) => {
      return {
        ...state,
        userLogined: action.payload,
      };
    },
    LOGOUT_USER: (state, action) => {
      return {
        ...state,
        userLogined: null,
      };
    },
  }
);

export default userReducer;
