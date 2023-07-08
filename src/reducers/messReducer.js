import { createReducer } from "@reduxjs/toolkit";

const messReducer = createReducer(
  {
    searchFilter: "",
    messs: [
      {
        id: "49621beb-c75f-459e-8706-00304e281122",
        email: "testMess1@mess1.com",
        name: "testMess1@mess1.com",
        phone: "0999999999",
        date: "2:05 09/07/2023",
        mess: "testMess",
        status: false,
      },
      {
        id: "6d947acc-7747-4bc9-9da8-b9a67a69e98a",
        email: "testMess2@mess2.com",
        name: "testMess2@mess2.com",
        phone: "0888888888",
        date: "2:06 08/06/2023",
        mess: "testMess",
        status: false,
      },
      {
        id: "4dc6de81-25ef-46c2-9a37-40ed6a6f08fb",
        email: "testMess4@mess2.com",
        name: "testMess4@mess2.com",
        phone: "0444444444",
        date: "2:06 04/05/2023",
        mess: "testMess",
        status: true,
      },
    ],
  },
  {
    SAVE_MESS: (state, action) => {
      return {
        ...state,
        messs: [...state.messs, action.payload],
      };
    },

    UPDATE_STATUS_MESS: (state, action) => {
      let updatedMess = state.messs.map((mess) => {
        if (mess.id === action.payload.id) {
          return action.payload;
        }
        return mess;
      });
      return {
        ...state,
        messs: updatedMess,
      };
    },
    SEARCH_MESS: (state, action) => {
      return {
        ...state,
        searchFilter: action.payload,
      };
    },
  }
);

export default messReducer;
