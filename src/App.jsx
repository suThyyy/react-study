import { useState } from "react";

function UserForm({ form, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={form.name} onChange={onChange} />

      <input type="email" name="email" value={form.email} onChange={onChange} />

      <button type="submit">Submit</button>
    </form>
  );
}

function UserInfo({ user }) {
  if (!user) return null;

  return (
    <div>
      <span>Name: {user.name} </span>
      <span>Email: {user.email} </span>
    </div>
  );
}

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [submittedUser, setSubmittedUser] = useState(null);

  function handleChange(e) {
    // tự viết
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    // tự viết
    e.preventDefault();
    setSubmittedUser(form);
  }

  return (
    <>
      <UserForm form={form} onChange={handleChange} onSubmit={handleSubmit} />

      <UserInfo user={submittedUser} />
    </>
  );
}

export default App;
