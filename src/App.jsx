import { useEffect, useState } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}

function Header() {
  const width = useWindowWidth();

  return <h2>Header width: {width}</h2>;
}

function Sidebar() {
  const width = useWindowWidth();

  return <h2>Sidebar width: {width}</h2>;
}

function Footer() {
  const width = useWindowWidth();

  return <h2>Footer width: {width}</h2>;
}

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Footer />
    </>
  );
}

export default App;
