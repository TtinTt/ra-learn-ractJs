import React, { useState } from "react";
import Counter from "./React/Counter";
import OrderForm from "./React/OrderForm";
import ProductList from "./React/ProductList";
function App() {
  return (
    <div>
      <Counter />
      <hr />
      <OrderForm />
      <hr />
      <ProductList />
    </div>
  );
}

export default App;
