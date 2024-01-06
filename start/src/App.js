import "./App.css";
import UserList from "./component/UserList";
import CreateUser from "./component/CreateUser";

import { useRef, useState } from "react";

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
    },
    {
      id: 2,
      username: "b",
      email: "bbb@naver.com",
    },
    {
      id: 3,
      username: "c",
      email: "ccc@naver.com",
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

  return (
    <div>
      <h2> hi </h2>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </div>
  );
}

export default App;
