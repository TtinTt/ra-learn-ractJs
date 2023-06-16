import countReducer from "../reducers/countReducer";
import { createStore } from "redux";

const countStore = createStore(countReducer);

export default countStore;
