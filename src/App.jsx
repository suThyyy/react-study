import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Users</h1>

      <Link to="/users/1">User 1</Link>
      <br />

      <Link to="/users/2">User 2</Link>
      <br />

      <Link to="/users/3">User 3</Link>
    </div>
  );
}

function UserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // tự viết fetch theo id
    async function getUser() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
        );
        if (!response.ok) {
          throw new Error("Fetch failed");
        }

        const data = await response.json();

        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [id]);

  return (
    <div>
      <Link to="/">Back</Link>

      {/* loading */ loading && <p>Loading...</p>}
      {/* error */ error && <p>Error:{error} </p>}
      {
        /* user */ !loading && !error && user && (
          <div>
            <h2>{user.name}</h2>
            <h2>{user.email} </h2>
          </div>
        )
      }
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
