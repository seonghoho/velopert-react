import "./App.css";
import UserList from "./component/UserList";
import CreateUser from "./component/CreateUser";

import { useMemo, useRef, useState } from "react";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중");
  return users.filter((user) => user.active).length;
}

function App() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "a",
      email: "aaa@naver.com",
      active: true,
    },
    {
      id: 2,
      username: "b",
      email: "bbb@naver.com",
      active: false,
    },
    {
      id: 3,
      username: "c",
      email: "ccc@naver.com",
      active: false,
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers([...users, user]);
    // setUsers(user.concat(user))

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  };

  const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  };
  // const count = countActiveUsers(users);
  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div>
      <h2> hi </h2>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </div>
  );
}

export default App;
