## useRef

### DOM을 직접 선택해야 하는 상황에서 사용한다.

- 특정 엘리먼트 크기를 가져올 때
- 스크롤바 위치를 가져올 때
- 포커스를 설정할 때
- 외부 라이브러리를 사용해야 할 때

```js
import React, { useState, useRef } from "react";
// ...
const nameInput = useRef();
// ...
const onReset = () => {
  setInputs({
    name: "",
    nickname: "",
  });
  nameInput.current.focus();
};
// ...
```


## map()

배열안에 있는 각 원소를 변환하여 새로운 배열을 만든다. <br>
동적인 배열을 렌더링해야 할 때 이 함수를 사용해 일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 변환하면 된다.

<br>

```js
import React from 'react';

function User({ user }) {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  );
}

function UserList() {
  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ];

  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default UserList;
```

위 코드처럼 key 라는 props를 설정해야 배열을 렌더링 할 수 있다.


### useRef 용도 추가 + 1

### 컴포넌트 안에서 조회 및 수정 할 수 있는 변수 관리하는 것

새 항목에서 사용 할 고유 id를 관리하는 용도로 사용한다. <br>

useRef() 를 사용 할 때 파라미터를 넣어주면, 이 값이 .current 값의 기본값이 된다.












