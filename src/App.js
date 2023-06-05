import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(1);

  const handleRandomButton = () => {
    setNumber(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <div className="App">
      <h1>Random Number</h1>
      <p>Number: {number}</p>
      <button onClick={handleRandomButton}>Random</button>
    </div>
  );
}

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = { number: 0 };
//   }

//   inceaseNumber() {
//     this.setState({
//       number: this.state.number + 1,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <p>{this.state.number}</p>
//         <button onClick={() => this.inceaseNumber()}>Tăng lên 1</button>
//       </div>
//     );
//   }
// }
export default App;
