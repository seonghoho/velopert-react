## useCallback

### useMemo와 비슷한 Hook

- useMemo 
  - 특정 결과 값을 재사용할 때 사용
- useCallback
  - 특정 함수를 새로 만들지 않고 새로 사용하고 싶을 때 사용

### onCreate, onRemove, onToggle 함수에 대해

위 함수들은 컴포넌트가 리렌더링 될 때마다 새로 만들어진다. 
함수를 선언하는 것 자체는 메모리나 CPU의 리소스를 많이 차지하지 않지만, 
한번 만든 함수를 필요할 때만 새로 만들고 재사용하는 것은 중요하다.
<br>
그 이유는, 나중에 컴포넌트에서 `props`가 바뀌지 않았으면 
Virtual DOM에 새로 렌더링하지 않고 컴포넌트의 결과물은 재사용하는 
최적화 작업을 하려고 하기 때문이다.

```js
  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    [inputs]
  );
```

### 주의할 점

<b> 함수 안에서 사용하는 상태나 props가 있다면, 꼭! `deps` 배열 안에 포함시켜야 된다.</b>
<br>
deps 배열에 함수에서 사용하는 값을 넣지 않으면, 함수에서 가장 최신 값을 참조할 것이라 보장할 수 없다.
<br>
props로 받아온 함수가 있다면 deps 에 넣어주어야 한다.

### 또다른 표현법

useCallback은 useMemo를 기반으로 만들어졌다. 더욱 편하게 함수를 사용하기 위해 손을 본 것 뿐이다.
```js
const onToggle = useMemo(
  () => () => {
    /* ... */
  },
  [users]
);
```