import React, { useState, useEffect } from "react";

function CountText() {
  const [count, setCount] = useState(0);
  const [textInput, setTextInput] = useState("");

  function getValueInput(event) {
    setTextInput(event.target.value);
  }

  function checkValueInput() {
    setCount(textInput.length);
  }

  return (
    <div>
      <p>Your text has {count} characters</p>
      <input
        onChange={(event) => {
          getValueInput(event);
        }}
        value={textInput}
      ></input>
      <button onClick={checkValueInput}>Check</button>
      <button
        onClick={() => {
          setCount(0);
          setTextInput("");
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default CountText;
