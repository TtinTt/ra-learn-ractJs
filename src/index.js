import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import todoReducer from "./reducers/todoReducer";
import App from "./App";

// tạo store chứa todoReducer
const store = createStore(todoReducer);

// gói <App/> bên trong 1 component hỗ trợ của react-redux là Provider,
// nhờ đó tất cả component trong <App/> có thể truy cập được store.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
