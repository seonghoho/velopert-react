import "./App.css";
import UserList from "./component/UserList";
import CreateUser from "./component/CreateUser";
import React, { useCallback, useMemo, useReducer, useRef } from "react";
import useInputs from "./hooks/useInputs";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는 중");
  return users.filter((user) => user.active).length;
}



  // useReducer 배우기 전

  // function App() {
  // const [inputs, setInputs] = useState({
  //     username: "",
  //     email: "",
  //   });
  //   const { username, email } = inputs;
  //
  //
  //   const [users, setUsers] = useState([
  //     {
  //       id: 1,
  //       username: "a",
  //       email: "aaa@naver.com",
  //       active: true,
  //     },
  //     {
  //       id: 2,
  //       username: "b",
  //       email: "bbb@naver.com",
  //       active: false,
  //     },
  //     {
  //       id: 3,
  //       username: "c",
  //       email: "ccc@naver.com",
  //       active: false,
  //     },
  //   ]); const nextId = useRef(4);
  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email,
  //   };
  //   setUsers([...users, user]);
  //   // setUsers(user.concat(user))
  //
  //   setInputs({
  //     username: "",
  //     email: "",
  //   });
  //   nextId.current += 1;
  // }, [username, email]);
  //  const onChange = (e) => {
  //     const { name, value } = e.target;
  //     setInputs({
  //       ...inputs,
  //       [name]: value,
  //     });
  //   };
  // const onRemove = useCallback((id) => {
  //   setUsers((users) => users.filter((user) => user.id !== id));
  // }, []);
  //
  // const onToggle = useCallback((id) => {
  //   setUsers((users) =>
  //     users.map((user) =>
  //       user.id === id ? { ...user, active: !user.active } : user,
  //     ),
  //   );
  // }, []);

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
            user.id === action.id ? { ...user, active: !user.active } : user
        )
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [{ username, email }, onChange, reset] = useInputs({
  username: '',
  email: ''
});
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;



  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);
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
