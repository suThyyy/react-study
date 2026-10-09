import { useState } from "react";

function NameInput({ name, setName }) {
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

function NameDisplay({ name }) {
  return <div>Text: {name}</div>;
}

function App() {
  const [name, setName] = useState("");

  return (
    <>
      <NameInput name={name} setName={setName} />
      <NameDisplay name={name} />
    </>
  );
}

export default App;
