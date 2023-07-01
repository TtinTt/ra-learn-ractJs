import productReducer from "../reducers/productReducer";
import userReducer from "../reducers/userReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({ productReducer, userReducer });

const store = configureStore({
  reducer: reducers,
});

export default store;
