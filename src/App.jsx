import { memo, useCallback, useState } from "react";

const Child = memo(function Child({ onHello }) {
  console.log("Child render");

  return <button onClick={onHello}>Hello</button>;
});

function App() {
  const [count, setCount] = useState(0);

  const handleHello = useCallback(() => {
    console.log("Hello Vu");
  }, []);

  return (
    <>
      <p>Count: {count}</p>

      <button onClick={() => setCount((prev) => prev + 1)}>
        Increase Count
      </button>

      <Child onHello={handleHello} />
    </>
  );
}

export default App;
/**Bạn có thể nhớ bộ ba này như sau:
useMemo
→ nhớ KẾT QUẢ tính toán

useCallback
→ nhớ FUNCTION

React.memo
→ tránh render lại COMPONENT CON nếu props không đổi

Ví dụ:
const filteredUsers = useMemo(() => {
  return users.filter(...);
}, [users, search]);

Nếu theme đổi:
- App render lại
- users không đổi
- search không đổi
- không filter lại 100.000 user
Còn:
const handleDelete = useCallback((id) => {
  ...
}, []);

nếu App render lại vì theme:
- handleDelete vẫn là cùng function
- nếu con dùng React.memo, prop function không bị coi là đổi
Một chỗ bạn nói cần sửa nhẹ là “hàm của component khác cũng chạy theo”. Chính xác hơn là:
App render lại thì function component App chạy lại, và các function được khai báo bên trong App thường được tạo lại; component con cũng có thể render lại theo cha nếu không được tối ưu. */
