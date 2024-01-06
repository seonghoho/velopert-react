## 1. 배열에 항목 추가하기

```js
// 빈 값 생성
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
});
const { username, email } = inputs;
// event가 발생할 때마다 호출하여 e.target의 값을 변경한다.
// 화면에 실시간으로 글자가 출력된다.
const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
        ...inputs,
        [name]: value,
    });
};

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
```




## 2. 배열에 항목 제거하기


#### list 컴포넌트에서는 아래와 같이 삭제 버튼을 만든다.
```js
function User({ user, onRemove }) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
}
// ...

<User user={user} key={user.id} onRemove={onRemove} />
```

#### 상위 컴포넌트에 onRemove 함수를 생성한다.
```js

const onRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
};

```

## 3. 배열에 항목 수정하기

#### onToggle

```js
  const onToggle = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user,
      ),
    );
  };
```

1. onToggle 함수는 id라는 매개변수를 받습니다. 이 id는 토글하고자 하는 사용자의 고유한 식별자입니다.
2. setUsers 함수를 호출하여 현재 사용자 목록을 업데이트합니다. 이 함수는 useState 훅을 통해 관리되는 users 상태를 업데이트하는데 사용됩니다.
3. - map 함수를 사용하여 현재의 사용자 목록을 순회합니다.
   - 각 사용자에 대해 삼항 연산자를 사용하여 현재 사용자의 id가 매개변수로 전달된 id와 일치하는지 확인합니다.
   - 일치하는 경우 { ...user, active: !user.active }로 사용자를 복사하여 새로운 객체를 생성합니다. 이때 active 속성을 현재 값의 반대로 토글합니다.
   - 일치하지 않는 경우 현재 사용자 그대로 반환합니다.
4. setUsers 함수를 호출하여 전체 사용자 목록을 업데이트합니다. 업데이트된 사용자 목록은 이전 상태에서 특정 사용자의 active 속성을 토글한 상태로 업데이트됩니다.
