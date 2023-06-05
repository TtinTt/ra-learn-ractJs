import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  // const [count2, setCount2] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  useEffect(
    function () {
      document.title = `You clicked ${count} times`;
      console.log(count, 0);
    },
    [count]
  );

  return (
    <div>
      <h1>You clicked {count} times</h1>
      <button onClick={handleIncrease}>Click me</button>
    </div>
  );
}

export default App;
