import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        <Link to="users">Users</Link>
        {" | "}
        <Link to="settings">Settings</Link>
      </nav>

      <Outlet />
    </div>
  );
}

function Users() {
  return <h2>Users Page</h2>;
}

function Settings() {
  return <h2>Settings Page</h2>;
}

function Home() {
  return <h1>Home</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
