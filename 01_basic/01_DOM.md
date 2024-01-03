## 1. Virtual DOM의 작동에 대해.

REACT에서는 virtual DOM을 적용한다. <br>
수정된 부분이 virtual DOM에 적용되고, virtual DOM 과 DOM의 변화된 부분을 적용하기 때문에 전체를 다시 렌더하지 않아도 되어 빠르고 메모리 소비도 적다. <br>
그렇다면, 과연 어떠한 방식으로 적용되는 것일까?
<br>
리액트는 실제 DOM의 UI를 가진 자바스크립트 객체를 메모리상에 가지고 있다. 가상 돔은 변화를 감지하면 재조정(Reconcilation)과정을 통하여 실제 DOM과 동기화 한다. 재조정 과정은 크게 3단계로 나뉜다.

1. UI가 변경을 감지하면 UI를 Virtual DOM으로 렌더링한다. (실제 화면상 렌더링 되는 것이 아닌 비교를 위한 가상 렌더링)
2. 현재 Virtual DOM과 이전 Virtual DOM을 비교해 차이를 계산한다.
3. 변경된 부분을 실제 DOM에 반영한다.
   <br>

### 장점

1. 성능
   - DOM 조작은 비용이 높은 작업이지만, 가상 돔은 메모리상에서만 동작하고, 조작을 최소화하여 성능을 향상시킨다.
2. 일관성
   - 가상 돔은 상태 변화를 추적하고, 적절한 타이밍에 변경 사항을 적용해 렌더링 일관성을 유지한다.
3. 편한 UI 관리
   - 가상 DOM은 UI관리를 효과적, 효율적으로 할 수 있게 한다.
4. Cross-Platform 지원
   - 가상 돔은 브라우저 독집적인 방식이기에 React Native와 같은 플랫폼에서도 활용 가능하다.
     <br>

### 단점

1. 추가적인 메모리 사용
   - 가상 돔은 DOM과 완전히 동일한 구조의 메모리를 유지하기 때문에 추가적인 메모리를 사용한다.
2. 복잡성 증가
   - 개발자가 앱의 view와 state를 동기화하기 위해 추가적인 추상화 계층을 사용해야 한다. 이로 인해 앱의 복잡성이 증가할 수 있다.
3. 특정 상황에서의 불필요함
   - 간단한 UI나 작은 규모에서는 과할 수 있다.

<br>

## 2. ReactDOM을 화면에 띄우는 과정

index.js을 살펴보자.

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

위 코드에서 root.render 의 역할은 브라우저에 있는 실제 DOM 내부에 리액트 컴포넌트를 렌더링하겠다는 것을 의미합니다. id 가 root 인 DOM 을 선택하고 있는데, 이 DOM은 index.html에 있다.
<br>

```html
<div id="root"></div>
```

리액트 컴포넌트가 랜더링될 때, 렌더링된 결과물이 index.html의 id가 root인 곳에 렌더링 된다.


