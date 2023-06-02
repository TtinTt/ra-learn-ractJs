// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Header from "./component/Header";
import Item from "./component/Item";
import ListItem from "./component/ListItem";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ListItem />

        <Item />
      </div>
    );
  }
}
export default App;
