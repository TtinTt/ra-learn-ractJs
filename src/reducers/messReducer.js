import { createReducer } from "@reduxjs/toolkit";

const messReducer = createReducer(
  {
    searchFilter: "",
    filter: 2,
    messs: [
      {
        id: "49621beb-c75f-459e-8706-00304e281122",
        email: "testMess1@mess1.com",
        name: "Lê Mrs",
        phone: "0999999999",
        date: "2:05 09/07/2023",
        mess: "Lời nhắn thử",
        status: false,
      },
      {
        id: "6d947acc-7747-4bc9-9da8-b9a67a69e98a",
        email: "testMess2@mess2.com",
        name: "Trần Quang Hà",
        phone: "0888888888",
        date: "2:06 08/06/2023",
        mess: "testMess",
        status: false,
      },
      {
        id: "4dc6de81-25ef-46c2-9a37-40ed6a6f08fb",
        email: "testMess4@mess2.com",
        name: "Minh Hà",
        phone: "0444444444",
        date: "2:06 04/05/2023",
        mess: "Lời nhắn thử gửi cho admin",
        status: true,
      },
      {
        id: "1a0f81b4-6a0f-4088-9939-0298943ff1e0",
        email: "demoUser1@gmail.com",
        name: "Trần Trọng Tín",
        phone: "0999999999",
        date: "1:18 10/07/2023",
        mess: "Lời nhắn thử thứ 2 gửi cho admin",
        status: false,
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
    FILTER_MESS: (state, action) => {
      return {
        ...state,
        filter: action.payload,
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
