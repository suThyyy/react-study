import { useState } from "react";

function ColorDisplay({ color }) {
  return <div>current color: {color}</div>;
}

function ColorButtons({ handleClick }) {
  return (
    <div>
      <button onClick={() => handleClick("red")}>Red</button>
      <button onClick={() => handleClick("blue")}>Blue</button>
      <button onClick={() => handleClick("green")}>Green</button>
    </div>
  );
}

function App() {
  const [color, setColor] = useState("red");
  function handleClick(color) {
    setColor(color);
  }
  return (
    <>
      <ColorDisplay color={color} />
      <ColorButtons handleClick={handleClick} />
    </>
  );
}

export default App;
