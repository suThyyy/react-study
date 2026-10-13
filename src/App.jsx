import { useState } from "react";

function useToggle(initialValue) {
  // tự viết
  const [value, setValue] = useState(initialValue);

  function toggle() {
    setValue((prev) => !prev);
  }
  return { value, toggle };
}

function Menu() {
  const { value, toggle } = useToggle(false);

  return (
    <>
      <button onClick={toggle}>Menu</button>
      {value && <p>Menu opened</p>}
    </>
  );
}

function Modal() {
  const { value, toggle } = useToggle(false);

  return (
    <>
      <button onClick={toggle}>Modal</button>
      {value && <p>Modal opened</p>}
    </>
  );
}

function Password() {
  const { value, toggle } = useToggle(false);

  return (
    <>
      <button onClick={toggle}>Show Password</button>
      <p>{value ? "123456" : "******"}</p>
    </>
  );
}

function App() {
  return (
    <>
      <Menu />
      <Modal />
      <Password />
    </>
  );
}

export default App;
