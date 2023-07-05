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
        cart: [],
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
        cart: [],
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
        cart: [],
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

    ADD_TO_CART: (state, action) => {
      let flag = false;
      // let updatedATC = state.userLogined.cart;

      let updatedATC = state.userLogined.cart.map((product) => {
        if (product.id === action.payload.id) {
          flag = true;
          return {
            ...product,
            quantity: product.quantity + action.payload.quantity,
          };
        }

        return product;
      });

      if (!flag) {
        updatedATC = [...updatedATC, action.payload];
      }

      console.log(updatedATC);

      localStorage.setItem(
        "userLogined",
        JSON.stringify({ ...state.userLogined, cart: updatedATC })
      );

      return {
        ...state,
        userLogined: { ...state.userLogined, cart: updatedATC },
      };

      // state.userLogined.cart = updatedATC;
    },
  }
);

export default userReducer;
