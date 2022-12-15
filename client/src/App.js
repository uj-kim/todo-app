import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const todoId = useRef(4);

  useEffect(() => {
    console.log("첫 렌더링 완료!");

    const getTodos = async () => {
      let result = await axios.get("http://localhost:8080/todos");
      console.log(result);
      return setTodoItems(result.data);
    };
    getTodos();
  }, []);

  // AddTodo 컴포넌트는 상위 컴포넌트(App)의 todoItems(state)에 접근 불가능
  // 상위 컴포넌트(App)은 AddTodo  컴포넌트에 접근 가능(부모 -> 자식)
  // => App 컴포넌트에 addItem() 함수를 정의하고, 해당 함수를 AddTodo props 로 넘겨야함
  const addItem = async (newItem) => {
    //newItem - {id: ?, title; ?, done : false}
    //setTodoItems()

    // newItem.id = todoId.current++; //key를 위한 id설정
    // newItem.done = false; // done 초기화
    // // 기존 todoItems를 유지하고, 새로운 newItem을 추가
    // setTodoItems([...todoItems, newItem]);
    //setTodoItems(todoItems.concat(newItem))과 같다

    const response = await axios.post("http://localhost:8080/todo", newItem);
    console.log(response.data);
    //기존 아이템 : ...todoItems
    // 새로운 아이템: response.data
    setTodoItems([...todoItems, response.data]);
  };

  const delItem = async (targetItem) => {
    //[Before]
    //console.log(targetItem);
    // const result = todoItems.filter((item) => item.id !== targetItem.id);
    // setTodoItems(result);

    //[AFTER]
    console.log(targetItem); //{id:x, title:xx, done:x}
    await axios.delete(`http://localhost:8080/todo/${targetItem.id}`);

    // 뷰 렌더링
    const result = todoItems.filter((item) => item.id !== targetItem.id);
    setTodoItems(result);
  };

  // API를 이용해서 update하려면
  // (1) server/routes/todo.js API를 이용해 서버 데이터를 업데이트 한 후
  // (2) 변경된 내용을 화면에 다시 출력하는 작업
  const updateItem = async (targetItem) => {
    console.log(targetItem);
    // axios.patch(url, data)
    await axios.patch(
      `http://localhost:8080/todo/${targetItem.id}`,
      targetItem
    );
  };
  return (
    <div className="App">
      <div className="heading">
        {/* <img
          className="heading__img"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg"
        /> */}
        <h1 className="heading__title">To-Do List</h1>
      </div>
      <label htmlFor="todo">~ Today I need to ~</label>
      <AddTodo addItem={addItem} />
      <div className="left-todos">🚀 {todoItems.length} Todos</div>
      {todoItems.length > 0 ? (
        todoItems.map((item) => {
          return (
            <Todo
              key={item.id}
              item={item}
              delItem={delItem}
              updateItem={updateItem}
            />
          ); // map함수는 return을 한다,,,
        })
      ) : (
        <p className="empty-todos">..Todo를 추가해주세요.. </p>
      )}
    </div>
  );
}

export default App;
