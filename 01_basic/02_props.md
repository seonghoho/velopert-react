# Props

### properties의 줄임말

### 부모가 자식에게 전달하기 위해 사용한다.

예를 들어, App 컴포넌트에서 Hello 컴포넌트를 사용 할 때 name 이라는 값을 전달해주고 싶다면

```js
App.js
import React from 'react';
import Hello from './Hello';

function App() {
return (
<Hello name="react" color="red"/>
);
}

export default App;
```

Hello 에서 name 값을 받을 때는

```js
import React from 'react';

function Hello(props) {
return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>
}

export default Hello;
```

컴포넌트에게 전달되는 props 는 파라미터를 통하여 조회 할 수 있다. <br>
props 는 객체 형태로 전달되고, 만약 name 값을 조회하고 싶다면 props.name 을 조회하면 된다.

위의 코드를 비구조화 할당 (구조 분해)를 사용하면 더 간결하게 사용할 수 있다.

```js
import React from 'react';

function Hello({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

// props 값을 지정하지 않았을 때 defaultProps로 기본값을 설정할 수 있다.
Hello.defaultProps = {
    name: '이름없음'
}

export default Hello;
```

## props.children

### 컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 때 사용한다.

```js
import React from 'react';

function Wrapper({ children }) {
  const style = {
    border: '2px solid black',
    padding: '16px',
  };
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export default Wrapper;
```

{children}으로 인해 Wrapper안에 들어있는 내용이 출력된다.

## 조건부 렌더링

### 특정 조건에 따라 다른 결과물을 렌더링하는 것

1. 삼항연산자 사용

```js
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      { isSpecial ? <b>*</b> : null }
      안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```

isSpecial이 true이면 <b>*</b>, 아니라면 null을 적용한다. <br>
JSX에서는 null, false, undefined를 렌더링하면 아무것도 나타나지 않게 된다.


2. && 연산자 사용

```js
import React from 'react';

function Hello({ color, name, isSpecial }) {
  return (
    <div style={{ color }}>
      {isSpecial && <b>*</b>}
      안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음'
}

export default Hello;
```

isSpecial && <b>*</b> 의 결과는 isSpecial 이 false 일땐 false 이고, 
isSpecial이 true 일 땐 <b>*</b> 가 된다. 

3. props 값 설정을 생략하면 true

```js
function App() {
  return (
    <Wrapper>
      <Hello name="react" color="red" isSpecial />
      <Hello color="pink"/>
    </Wrapper>
  );
}
```