## custom Hook

컴포넌트 만들 때 반복되는 로직을 쉽게 재사용하는 방법이다.
<br> 
커스텀 Hooks를 만드는 방법은 간단하다. <br>
이 안에서 useState, useEffect, useReducer, useCallback 등 Hooks를 사용하여 원하는 기능을 구현하고,
컴포넌트에서 사용하고 싶은 값들을 반환하면 된다.
<br>

```js
import { useState, useCallback } from 'react';

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setForm(form => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange, reset];
}

export default useInputs;
```

위에서 만든 useInputs라는 함수를 사용하면 된다.
<br>
App.js에서 inputs를 제거하고 useInputs를 대체하면 된다.

