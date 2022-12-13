// 1. 함수형 컴포넌트
// 2. input(checkbox)와 label을 렌더링하는 컴포넌트!
// 3. App(부모 컴포넌트 => App.js)에서 Todo(자식 컴포넌트) 1개를 렌더링  (<Todo />)
import { useState } from "react";

const Todo = ({ item, delItem }) => {
  const { id, title, done } = item;

  const [todoItem, setTodoItem] = useState(item);

  const delClick = (todoItem) => {
    delItem(todoItem);
  };

  return (
    <div className="Todo">
      {/*가장 상위 div에 className을 파일명과 같게 부여 */}
      <input
        type="checkbox"
        id={`todo${id}`}
        name={`todo${id}`}
        value={`todo${id}`}
        defaultChecked={done}
      />
      <label htmlFor={`todo${id}`}>{title}</label>
      <button onClick={() => delClick(item.id)}>Delete</button>
    </div>
  );
};

export default Todo;
