import { useState } from "react";

function SelectedProduct() {
  return <div></div>;
}

function ProductList() {
  return <div></div>;
}

function App() {
  const products = ["Laptop", "Phone", "Tablet"];

  return (
    <>
      <SelectedProduct />
      <ProductList />
    </>
  );
}

export default App;
