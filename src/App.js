import React from "react";

class App extends React.Component {
  sum(num1, num2) {
    return num1 + num2;
  }
  render() {
    const num1 = 7;
    const num2 = 4;

    return (
      <div>
        Tổng của {num1} và {num2} là {this.sum(num1, num2)}
      </div>
    );
  }
}

export default App;
