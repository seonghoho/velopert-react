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

### 초기 state의 구체화

