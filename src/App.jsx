import { useState } from "react";

function useCounter() {
  // tự viết
  const [count, setCount] = useState(0);

  function increase() {
    setCount((prev) => prev + 1);
  }

  function decrease() {
    setCount((prev) => prev - 1);
  }
  return { count, increase, decrease };
}

function Counter() {
  // gọi useCounter
  const { count, increase, decrease } = useCounter();

  return (
    <div>
      <div>Count: {count} </div>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
}

function App() {
  return <Counter />;
}

export default App;
