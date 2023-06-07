import React, { useState, useEffect } from "react";

function CountText() {
  const [count, setCount] = useState(0);
  // dùng useEffect đếm số lần thay đổi của văn bản
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>dùng useEffect đếm số lần thay đổi</p>
      <p>Your text has {count} characters</p>
      <textarea onChange={() => setCount(count + 1)}></textarea>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default CountText;
