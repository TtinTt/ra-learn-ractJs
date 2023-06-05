import { useState, useReducer } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const UP = "UP";
  const DOWN = "DOWN";

  const reducer = (state, action) => {
    if (action === UP) {
      return state + 1;
    } else if (action === DOWN) {
      return state - 1;
    }
  };

  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div className="App">
      <h1>REDUCER</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(UP)}>Up</button>
      <button onClick={() => dispatch(DOWN)}>Down</button>
    </div>
  );
}

export default App;
