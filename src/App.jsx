import { useState } from "react";

function ProductItem({ product, sum }) {
  const [quantity, setQuantity] = useState(0);
  function calcQuantity() {
    setQuantity((prev) => prev + 1);
    sum();
  }
  return (
    <div>
      <span>Product Name: {product} </span>
      <span>Quantity: {quantity} </span>
      <button onClick={calcQuantity}>Add</button>
    </div>
  );
}

function ProductList({ products, sum }) {
  return (
    <div>
      {products.map((product, index) => (
        <ProductItem key={index} product={product} sum={sum} />
      ))}
    </div>
  );
}

function TotalQuantity({ total }) {
  return (
    <div>
      <span>Total: {total}</span>
    </div>
  );
}

function App() {
  const products = ["Laptop", "Phone", "Tablet"];
  const [totalQuantities, setTotalQuan] = useState(0);
  function sumQuantities() {
    setTotalQuan((prev) => prev + 1);
  }
  return (
    <>
      <TotalQuantity total={totalQuantities} />
      <ProductList products={products} sum={sumQuantities} />
    </>
  );
}

export default App;
