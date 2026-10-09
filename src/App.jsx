import { useState } from "react";
function UserList({ users, onSelectUser }) {
  return (
    <div>
      {users.map((user) => (
        <button key={user.id} onClick={() => onSelectUser(user)}>
          {user.name}
        </button>
      ))}
    </div>
  );
}

function UserDetail({ selectedUser }) {
  if (!selectedUser) {
    return <div>Chưa chọn user</div>;
  }
  return (
    <div>
      <span>Name: {selectedUser.name}</span>
      <span>Age: {selectedUser.age}</span>
    </div>
  );
}

function App() {
  const users = [
    { id: 1, name: "Vu", age: 22 },
    { id: 2, name: "Nam", age: 23 },
    { id: 3, name: "An", age: 20 },
  ];
  const [selectedUser, setUser] = useState(null);

  return (
    <>
      <UserList users={users} onSelectUser={setUser} />
      <UserDetail selectedUser={selectedUser} />
    </>
  );
}
export default App;
