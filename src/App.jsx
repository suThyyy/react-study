import { useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const refCount = useRef(0);

  function increaseState() {
    setCount((prev) => prev + 1);
  }

  function increaseRef() {
    refCount.current += 1;
    console.log("refCount:", refCount.current);
  }

  return (
    <>
      <p>State count: {count}</p>
      <p>Ref count: {refCount.current}</p>

      <button onClick={increaseState}>Increase State</button>
      <button onClick={increaseRef}>Increase Ref</button>
    </>
  );
}

export default App;
