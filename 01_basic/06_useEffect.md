## useEffect

### 마운트, 언마운트, 업데이트 시 특정 작업을 처리한다.

```js
useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);
```

첫 번째 파라미터에는 함수, 두 번째 파라미터에는 의존값이 들어있는 배열 (`deps`)을 넣는다.
<br>
만약, `deps` 배열을 비우게 된다면 컴포넌트가 처음 나타날 때만 함수가 호출된다.
<br>
반환하는 함수는 `cleanup` 함수라고 부른다. `cleanup` 함수는 뒷정리를 한다고 보면 된다. <br>
다르게 말하면, 컴포넌트가 언마운트 되기 직전에 `cleanup` 함수가 `return`되고 끝난다.

### 마운트 시 하는 작업

- `props`로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등)
- setInterval 을 통한 반복작업 혹은 setTimeout을 통한 작업 예약

### 언마운트 시 하는 작업

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeourt)
- 라이브러리 인스턴스 제거

### deps 에 특정 값 넣기

deps에 지정한 값이 바뀔 때에도 호출이 된다.

```js
  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);
    return () => {
      console.log('user 가 바뀌기 전..');
      console.log(user);
    };
  }, [user]);
```

useEffect 안에서 사용하는 상태나 props를 `deps`에 넣지 않게 되면 useEffect에 등록한 함수가 실행될 때 최신 props나 상태를 가르키지 않게 된다.

### deps 파라미터 생략하기

deps 파라미터를 생략하면 컴포넌트가 리렌더링 될 때마다 호출된다.
<br>
참고로 부모 컴포넌트가 리렌더링 되면 자식 컴포넌트도 리렌더링된다.
