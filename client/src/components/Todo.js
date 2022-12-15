// 1. 함수형 컴포넌트
// 2. input(checkbox)와 label을 렌더링하는 컴포넌트!
// 3. App(부모 컴포넌트 => App.js)에서 Todo(자식 컴포넌트) 1개를 렌더링  (<Todo />)
import { useState } from "react";
import "../styles/style.scss";

const Todo = ({ item, delItem, updateItem }) => {
  const { id, title, done } = item;

  const [todoItem, setTodoItem] = useState(item);

  const [isreadOnly, setReadOnly] = useState(true);

  const delClick = () => {
    delItem(todoItem);
  };

  const editEventHandler = (e) => {
    //rest: id, done 정보
    const { title, ...rest } = todoItem;
    setTodoItem({
      title: e.target.value,
      ...rest,
    });
  };

  // checkbox 업데이트
  // done : true -> false, false -> true
  const checkboxEventHandler = (e) => {
    // rest: id, title 정보
    const { done, ...rest } = todoItem; // { id: 1, title: 'todo1', done: false, }
    const updatedItem = {
      done: e.target.checked,
      ...rest,
    };
    setTodoItem(updatedItem);
    updateItem(updatedItem);
  };
  const offReadOnlyMode = () => {
    setReadOnly(false);
  };

  const onEnterKey = (e) => {
    if (e.key == "Enter") {
      console.log(item);
      setReadOnly(true);
      updateItem(todoItem);
    }
  };

  return (
    <div className="Todo">
      {/*가장 상위 div에 className을 파일명과 같게 부여 */}
      <label className={`${done ? "checked" : ""} checkboxCard`}>
        <input
          type="checkbox"
          id={`todo${id}`}
          className="checkbox"
          name={`todo${id}`}
          value={`todo${id}`}
          defaultChecked={done}
          onChange={checkboxEventHandler}
        />
        {/* <label htmlFor={`todo${id}`}>{title}</label> */}
        <input
          id="todobox"
          type="text"
          value={todoItem.title}
          onChange={editEventHandler}
          onKeyPress={onEnterKey}
          readOnly={isreadOnly}
          onFocus={offReadOnlyMode}
          onBlur={() => setReadOnly(true)}
        />
        <button onClick={delClick}>
          <span>Delete</span>
        </button>
      </label>
    </div>
  );
};

export default Todo;
