## useReducer

useState의 대체 함수이다. 
(state, action) => newState의 형태로 reducer를 받고 dispatch 메서드와 짝의 형태로 현재 state를 반환한다.
Redux의 동작과 비슷하다. 
<br>
reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다.
<br>
다수의 하윗값을 포함하는 복잡한 정적 로직을 만드는 경우나, 다음 state가 이전 state에 의존적인 경우
useState보다 useReducer를 선호한다.

성능 최적화를 할 수 있는 이유는 콜백함수 대신 dispatch를 전달할 수 있기 때문이다.

```js
function reducer(state, action) {
  // 새로운 상태를 만드는 로직
  // const nextState = ...
  return nextState;
}
```

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

React는 dispatch 함수의 동일성이 안정적이고 리렌더링 시에도
변경되지 않으리라는 것을 보장한다.
이것이 useEffect나 useCallback 의존성 목록에 이 함수를 포함하지 않아도 괜찮은 이유이다.


### 내가 이해한 내용 

Redux와 동작이 유사하다고 한 것은, <br>
예를 들어 버튼의 경우, control 하고자 하는 값과 값의 상태변화를 reducer 함수에서 변경하고,
onClick이 발생하는 위치에서는 dispatch 함수를 적어 (dispatch({type: 'decrement'}))
값의 변경을 요청하는 것이다. <br>
버튼이 직접적으로 값을 변경하지 않아 컨트롤하기 편하다고 이해했다.
<br>


```js
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
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} />
      <UserList users={users} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

CHANGE_INPUT 이라는 액션 객체를 사용하여 inputs 상태를 업데이트해줬다.
reducer 함수에서 새로운 상태를 만들 때에는 불변성을 지켜주어야 하기 때문에 
위 형태와 같이 spread 연산자를 사용해주었다.

```js
  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);
```
위 onCreate를 추가한다.

```js
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);

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

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
      <div>활성사용자 수 : 0</div>
    </>
  );
}

export default App;
```

### useReducer vs useState

- useState
  -  컴포넌트에서 관리하는 값이 딱 하나고, 그 값이 단순한 숫자, 문자열 또는 boolean 값일 때 편하다.
  - ```js
        const [value, setValue] = useState(true);
    ```
- useReducer
  - 컴포넌트에서 관리하는 값이 여러개가 되어 상태의 구조가 복잡해질 때 사용하면 편하다.
    - ```js
      setUsers(users => users.concat(user));
      setInputs({
          username: '',
          email: ''
        });
        ```
      