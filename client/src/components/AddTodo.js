// 1. 함수형 컴포넌트

import { useState } from "react";
import "../styles/style.scss";

// 2. input과 button을 가짐
const AddTodo = ({ addItem }) => {
  //사용자 입력을 저장할 객체
  ///(id, title, done에 대한 정보를 저장해야해서 객체)oItem] = (useState({
  const [todoItem, setTodoItem] = useState({
    title: "",
  });

  const onButtonClick = () => {
    if (todoItem.title.trim().length === 0) {
      return;
    }
    //props로 받아온 addItem 함수 실행
    addItem(todoItem); //{title: 'input 입력값'}
    setTodoItem({ title: "" }); //input 초기화
  };

  const onEnterKey = (e) => {
    if (e.key == "Enter") {
      onButtonClick();
    }
  };

  return (
    <div className="AddTodo">
      <input
        id="addbox"
        type="text"
        placeholder="Add your new Todo"
        value={todoItem.title}
        onChange={(e) => setTodoItem({ title: e.target.value })}
        onKeyPress={onEnterKey}
        autoFocus
        required
      />
      <button onClick={onButtonClick}>
        <span>ADD</span>
      </button>
    </div>
  );
};

export default AddTodo;
