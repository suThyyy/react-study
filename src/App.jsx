import { useState } from "react";

function UserCard({ name, age }) {
  const [currentAge, setAge] = useState(age);
  return (
    <div className="usercard">
      <div className="name">{name}</div>
      <div className="age"> {currentAge} </div>
      <button
        className="inc-age"
        onClick={() => setAge((currentAge) => currentAge + 1)}
      >
        + 1 tuổi
      </button>
      <button
        className="dec-age"
        onClick={() => setAge((currentAge) => currentAge - 1)}
      >
        -1 tuổi
      </button>
    </div>
  );
}

function App() {
  return (
    <>
      <UserCard name="Vu" age={22} />
      <UserCard name="Nam" age={23} />
    </>
  );
}

export default App;
