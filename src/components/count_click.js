import { useState, useReducer } from "react";

function countClick() {
  const click = "click ";

  const reducer = (state, action) => {
    if (action === click) {
      return state + 1;
    }
  };

  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div className="App">
      <h1>Đếm số lần click</h1>
      <p>Bạn đã click: {count} lần</p>
      <button onClick={() => dispatch(click)}>click </button>
    </div>
  );
}

export default countClick;
