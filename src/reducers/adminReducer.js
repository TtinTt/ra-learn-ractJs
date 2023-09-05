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
    searchFilter: "",
    filter: null,
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
    FILTER_ADMIN: (state, action) => {
      return {
        ...state,
        filter: action.payload,
      };
    },
    ADD_ADMIN: (state, action) => {
      return {
        ...state,
        admins: [...state.admins, action.payload],
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
        adminLogined: {
          ...state.adminLogined,
          email: action.payload.email,
          // name: action.payload.name,
          // bday: action.payload.bday,
          // status: action.payload.status,
          // add_address: action.payload.add_address,
          // // note: action.payload.note,
          // phone: action.payload.phone,
          // img: img,
        },
      };
    },
    UPDATE_STATUS_ADMIN: (state, action) => {
      let updatedAdmins = state.admins.map((admin) => {
        if (admin.email === action.payload.email) {
          return action.payload;
        }
        return admin;
      });
      return {
        ...state,
        admins: updatedAdmins,
      };
    },
    SEARCH_ADMIN: (state, action) => {
      return {
        ...state,
        searchFilter: action.payload,
      };
    },
    CHANGE_PASSWORD_ADMIN: (state, action) => {
      let updatedPassAdmins = state.admins.map((admin) => {
        if (admin.email === action.payload.email) {
          console.log({ ...admin, password: action.payload.password });

          return { ...admin, password: action.payload.password };
        } else {
          return admin;
        }
      });

      console.log("đây", updatedPassAdmins);

      return {
        ...state,
        admins: updatedPassAdmins,
      };
    },
  }
);

export default adminReducer;
