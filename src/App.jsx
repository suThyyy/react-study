import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return <button onClick={toggleTheme}>Current Theme: {theme}</button>;
}

function Toolbar() {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <Toolbar />
    </ThemeContext.Provider>
  );
}

export default App;
