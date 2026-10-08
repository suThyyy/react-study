import { useState } from "react";

function CartDisplay({ cart }) {
  return <div className="cart-display">Cart: {cart}</div>;
}

function ProductCard({ name, onCartClick }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="prod-card">
      <span className="name">{name}</span>

      <span className="quantity">Quantity: {quantity}</span>

      <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>

      <button onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>
        -
      </button>

      <button onClick={() => onCartClick(quantity)}>Add to Cart</button>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState(0);

  function addToCart(quantity) {
    setCart((prev) => prev + quantity);
  }

  return (
    <>
      <CartDisplay cart={cart} />

      <ProductCard name="Laptop" onCartClick={addToCart} />

      <ProductCard name="Phone" onCartClick={addToCart} />
    </>
  );
}

export default App;
