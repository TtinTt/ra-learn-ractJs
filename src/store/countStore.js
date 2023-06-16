import todoReducer from "../reducers/todoReducer";
import { createStore } from "redux";

const todoStore = createStore(todoReducer);

export default todoStore;
