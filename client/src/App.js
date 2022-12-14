import { useState, useRef } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";

function App() {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: "My Todo1",
      done: false,
    },
    {
      id: 2,
      title: "My Todo2",
      done: false,
    },
    {
      id: 3,
      title: "My Todo3",
      done: true,
    },
  ]);

  const todoId = useRef(4);
  // AddTodo 컴포넌트는 상위 컴포넌트(App)의 todoItems(state)에 접근 불가능
  // 상위 컴포넌트(App)은 AddTodo  컴포넌트에 접근 가능(부모 -> 자식)
  // => App 컴포넌트에 addItem() 함수를 정의하고, 해당 함수를 AddTodo props 로 넘겨야함
  const addItem = (newItem) => {
    //newItem - {id: ?, title; ?, done : false}
    //setTodoItems()

    newItem.id = todoId.current++; //key를 위한 id설정
    newItem.done = false; // done 초기화
    // 기존 todoItems를 유지하고, 새로운 newItem을 추가
    setTodoItems([...todoItems, newItem]);
    //setTodoItems(todoItems.concat(newItem))과 같다
  };

  const delItem = (targetItem) => {
    //console.log(targetItem);
    const result = todoItems.filter((item) => item.id !== targetItem.id);
    setTodoItems(result);
  };

  return (
    <div className="App">
      <div className="heading">
        <img
          className="heading__img"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg"
        />
        <h1 className="heading__title">To-Do List</h1>
      </div>
      <label htmlFor="todo">~ Today I need to ~</label>
      <AddTodo addItem={addItem} />
      <div className="left-todos">🚀 {todoItems.length} Todos</div>
      {todoItems.length > 0 ? (
        todoItems.map((item) => {
          return <Todo key={item.id} item={item} delItem={delItem} />; // map함수는 return을 한다,,,
        })
      ) : (
        <p className="empty-todos">Todo를 추가해주세요 </p>
      )}
    </div>
  );
}

export default App;
