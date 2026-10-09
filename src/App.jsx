import { useState } from "react";

function SelectedProduct({ product }) {
  return (
    <div>{product ? `Selected product: ${product}` : "Chua chon san pham"}</div>
  );
}

function ProductList({ products, onSelectProduct }) {
  return (
    <div>
      {products.map((product, index) => (
        <button key={index} onClick={() => onSelectProduct(product)}>
          {product}
        </button>
      ))}
    </div>
  );
}

function App() {
  const products = ["Laptop", "Phone", "Tablet"];
  const [product, selectProduct] = useState("");
  function onSelectProduct(product) {
    selectProduct(product);
  }
  return (
    <>
      <SelectedProduct product={product} />
      <ProductList products={products} onSelectProduct={onSelectProduct} />
    </>
  );
}

export default App;
