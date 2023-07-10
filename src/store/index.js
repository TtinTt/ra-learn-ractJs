import productReducer from "../reducers/productReducer";
import userReducer from "../reducers/userReducer";
import orderReducer from "../reducers/orderReducer";
import adminReducer from "../reducers/adminReducer";
import messReducer from "../reducers/messReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  productReducer,
  userReducer,
  orderReducer,
  adminReducer,
  messReducer,
});

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

// lấy preloadedState làm giá trị khởi tạo cho redux store
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;
