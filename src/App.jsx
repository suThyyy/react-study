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
function ErrorMessage({ message }) {
  if (!message) return null;

  return <div>{message}</div>;
}

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({
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
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  }

  function handleSubmit(e) {
    // tự viết
    e.preventDefault();
    const newErrors = { name: "", email: "" };
    if (form.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    if (!form.email.includes("@")) {
      newErrors.email = "Email is invalid";
    }
    setErrors(newErrors);
    if (newErrors.name === "" && newErrors.email === "") setSubmittedUser(form);
    else setSubmittedUser(null);
  }

  return (
    <>
      <UserForm form={form} onChange={handleChange} onSubmit={handleSubmit} />

      <UserInfo user={submittedUser} />
      <ErrorMessage message={errors.name} />
      <ErrorMessage message={errors.email} />
    </>
  );
}

export default App;
