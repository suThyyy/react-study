import { useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  // tăng renderCount.current ở đây
  renderCount.current += 1;

  return (
    <>
      <p>Count: {count}</p>
      <p>Render count: {renderCount.current}</p>

      <button onClick={() => setCount((prev) => prev + 1)}>Add</button>
    </>
  );
}

export default App;
