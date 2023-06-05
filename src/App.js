import "./App.css";
import React from "react";
import Login from "./components/login";
import Resigter from "./components/register";

class App extends React.Component {
  render() {
    return (
      <div>
        <Login />
        <hr></hr>
        <Resigter />
      </div>
    );
  }
}
export default App;
