import { useMemo, useState } from "react";

function App() {
  const [number, setNumber] = useState(1);
  const [count, setCount] = useState(0);

  // dùng useMemo để tính:
  // doubled = number * 2
  // chỉ tính lại khi number đổi

  const doubled = useMemo(() => {
    console.log("Tính lại...");
    return number * 2;
  }, [number]);

  return (
    <>
      <p>Number: {number}</p>
      <p>Count: {count}</p>
      <p>Doubled: {/* ... */ doubled}</p>

      <button onClick={() => setNumber((prev) => prev + 1)}>
        Increase Number
      </button>

      <button onClick={() => setCount((prev) => prev + 1)}>
        Increase Count
      </button>
    </>
  );
}

export default App;
