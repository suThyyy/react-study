import { useEffect, useState } from "react";

function App() {
  const [x, setX] = useState(0);

  useEffect(() => {
    function handleMouseMove(e) {
      // cập nhật x bằng vị trí chuột theo chiều ngang
      setX(e.clientX);
    }

    // thêm listener mousemove
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      // xóa listener
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <p>Mouse X: {x}</p>;
}

export default App;
