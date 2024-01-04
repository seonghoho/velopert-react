# useState

컴포넌트에서 보여줘야 하는 내용이 사용자 인터랙션에 따라 바뀌어야 할 때 사용한다.
<br>

컴포넌트에서 동적인 값을 상태(state)라고 부른다. <br>
Hooks 중 하나인 `useState` 라는 함수를 사용해 상태를 관리한다.

```js
import React, { useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(number + 1);
  };
  const onDecrease = () => {
    setNumber(number - 1);
  };
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

위 코드에서

```js
import React, { useState } from "react";
```

이 코드로 리액트 패키지에서 useState 함수를 불러온다.
<br>
useState(0);과 같이 상태의 기본값을 상태로 넣어 호출한다.
<br>
첫번째 원소는 현재 상태, 두번째 원소는 Setter 함수이다.

### setNumber를 화살표 함수로 표현할 수 있다

```js
const onIncrease = () => {
  setNumber(number + 1);
};

const onIncrease = () => {
  setNumber((prevNumber) => prevNumber + 1);
};
```

## 글을 적는대로 표시되게 하는 방법

```js
import React, { useState } from "react";

function InputSample() {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText("");
  };

  return (
    <div>
      <input onChange={onChange} value={text} />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: {text}</b>
      </div>
    </div>
  );
}

export default InputSample;
```

### input 개수 여러개일 때

```js
import React, { useState } from "react";

function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });

  const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
  };

  return (
    <div>
      <input name="name" placeholder="이름" onChange={onChange} value={name} />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default InputSample;
```
