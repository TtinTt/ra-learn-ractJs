import React, { useState } from "react";

function CountClick2() {
  //Khai báo biến count bằng useState
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>dùng useState khai báo biến count</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default CountClick2;
