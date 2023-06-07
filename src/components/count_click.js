import { useState, useReducer } from "react";

function CountClick() {
  const CLICK = "CLICK";
  const DOWN = "DOWN";

  const reducer = (state, action) => {
    if (action === CLICK) {
      return state + 1;
    }
  };

  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h1>Ứng dụng đếm số lần click</h1>
      <p>Bạn đã click: {count} lần</p>
      <button onClick={() => dispatch(CLICK)}>Click</button>
    </div>
  );
}

export default CountClick;
