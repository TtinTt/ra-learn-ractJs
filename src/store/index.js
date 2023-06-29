import jobReducer from "../reducers/jobReducer";
import userReducer from "../reducers/userReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducers = combineReducers({ jobReducer, userReducer });

const store = configureStore({
  reducer: reducers,
});

export default store;
