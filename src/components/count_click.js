import React, { useState } from "react";

function CountClick() {
  //Khai báo biến count bằng useState
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default CountClick;
