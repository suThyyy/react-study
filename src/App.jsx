import { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // tạo interval 1 giây
    // mỗi lần chạy thì seconds + 1
    // return cleanup
    // clear interval
    const timer = setInterval(() => {
      console.log(seconds);
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <p>Seconds: {seconds}</p>;
}

export default App;
