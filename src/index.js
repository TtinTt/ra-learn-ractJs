import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import listProductReducer from "./reducers/listProductReducer";
import cartReducer from "./reducers/cartReducer";
import { combineReducers } from "redux";
import { BrowserRouter } from "react-router-dom";

// combine reducers
const allReducers = combineReducers({
  listProductReducer,
  cartReducer,
});

// tạo store chứa allReducers
const store = createStore(allReducers);

// gói <App/> bên trong 1 component hỗ trợ của react-redux là Provider,
// nhờ đó tất cả component trong <App/> có thể truy cập được store.
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </BrowserRouter>,

  document.getElementById("root")
);
