import { useState } from "react";

function ScoreDisplay({ score }) {
  return (
    <div>
      <div className="score-display">{score}</div>
    </div>
  );
}

function ScoreButton({ onButtonClick }) {
  return (
    <button className="inc-score" onClick={onButtonClick}>
      +1
    </button>
  );
}

function App() {
  const [score, setScore] = useState(0);
  function handleBtnClick() {
    setScore((prev) => prev + 1);
  }
  return (
    <>
      <ScoreDisplay score={score} />
      <ScoreButton onButtonClick={handleBtnClick} />
    </>
  );
}

export default App;
