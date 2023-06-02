import logo from "./logo.svg";
import "./App.css";
import React from "react";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

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

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => this.inceaseNumber()}>Tăng lên 1</button>
      </div>
    );
  }
}
export default App;
