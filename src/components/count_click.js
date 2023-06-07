import React, { useState, useEffect } from "react";

function CountClick() {
  const [count, setCount] = useState(0);
  // dùng useEffect đếm số lần thay đổi
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>dùng useEffect đếm số lần thay đổi</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default CountClick;
