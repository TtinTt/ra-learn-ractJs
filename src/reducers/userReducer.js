import { createReducer } from "@reduxjs/toolkit";

const userReducer = createReducer(
  {
    userLogined: null,
    users: [
      {
        email: "demoUser1@gmail.com",
        password: "demoUser1@gmail.com",
        name: "Trần Trọng Tín",
        cart: [],
        bday: "",
        date: "",
        add: "",
        phone: "",
        img: "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif",
      },
      {
        email: "demoUser2@gmail.com",
        password: "demoUser2@gmail.com",
        name: "",
        cart: [],
        bday: "",
        date: "",
        add: "",
        phone: "",
        img: "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif",
      },
      {
        email: "demoUser3@gmail.com",
        password: "demoUser3@gmail.com",
        name: "",
        cart: [],
        bday: "",
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
      let updatedUser = state.users.map((user) => {
        if (user.email === state.userLogined.email) {
          return {
            ...user,
            cart: state.userLogined.cart,
            email: state.userLogined.email,
            name: state.userLogined.name,
            bday: state.userLogined.bday,
            add: state.userLogined.add,
            note: state.userLogined.note,
            phone: state.userLogined.phone,
            img: state.userLogined.img,
          };
        }

        return user;
      });
      // lưu lại cart khi đăng xuất
      return {
        ...state,
        userLogined: null,
        users: updatedUser,
      };
    },

    ADD_TO_CART: (state, action) => {
      let flag = false;

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

      let updatedCartUser = state.users.map((user) => {
        if (user.email === state.userLogined.email) {
          return {
            ...user,
            cart: updatedATC,
          };
        }

        return user;
      });

      if (!flag) {
        updatedATC = [...updatedATC, action.payload];
      }

      return {
        ...state,
        userLogined: { ...state.userLogined, cart: updatedATC },
        users: updatedCartUser,
      };
    },

    DELETE_FROM_CART: (state, action) => {
      let updatedATC = state.userLogined.cart.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        userLogined: { ...state.userLogined, cart: updatedATC },
      };
    },

    CHANGE_QUANTITY: (state, action) => {
      // console.log(action.payload);
      let updatedATC = state.userLogined.cart.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity,
          };
        }

        return product;
      });

      return {
        ...state,
        userLogined: { ...state.userLogined, cart: updatedATC },
      };
    },
    CLEAR_CART: (state, action) => {
      return {
        ...state,
        userLogined: { ...state.userLogined, cart: [] },
      };
    },
    UPDATE_INFO: (state, action) => {
      let img = action.payload.img;
      if (img == "") {
        img =
          "https://www.getillustrations.com/photos/pack/video/55895-3D-AVATAR-ANIMATION.gif";
      }
      return {
        ...state,
        userLogined: {
          ...state.userLogined,
          email: action.payload.email,
          name: action.payload.name,
          bday: action.payload.bday,
          add: action.payload.add,
          note: action.payload.note,
          phone: action.payload.phone,
          img: img,
        },
      };
    },
  }
);

export default userReducer;
