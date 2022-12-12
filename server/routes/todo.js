const express = require("express");
const { Todo } = require("../models");
const router = express.Router();

// 기본주소: localhost:PORT/

// GET localhost:PORT/todos - show all todos (READ)
router.get("/todos", async (req, res) => {
  // Todo.findAll().then((data) => {
  //   res.send(data);
  // });

  try {
    let data = await Todo.findAll();
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// POST localhost:PORT/todo - create a new todo (CREATE)
router.post("/todo", async (req, res) => {
  try {
    let newTodo = await Todo.create({
      title: req.body.title,
    });
    res.send(newTodo);
  } catch (err) {
    res.send(err);
  }
});

// PATCH localhost: PORT/todo/:todoId = edit a specific todo (UPDATE)
// 수정 성공시; true => res.send(true)
// 수정 실패시; false => res.send(false)
router.patch("/todo/:todoId", async (req, res) => {
  try {
    let [editTodo] = await Todo.update(
      {
        title: req.body.title,
        done: req.body.done,
      },
      {
        where: {
          id: req.params.todoId,
        },
      }
    );
    //console.log(editTodo);
    if (!editTodo) {
      return res.send(false);
    }
    res.send(true);
  } catch (err) {
    res.send(err);
  }
});

/* Todo.update({
  title:req.body.title,
  done: req.body.done,
},
{ where: {
  id: req.params.todoId,
},
}).then((result) => {
  console.log(result); //수정 성공시[1], 수정 실패시 [0] 출력

  if(result[0]){
  res.send(true);
  } else{
    res.send(false);
  }
});

// 차이는 없으나, try-catch가 depth가 덜 깊기 때문에 선호된다.
*/

// DELETE localhost:PORT/todo/todoId
router.delete("/todo/:todoId", async (req, res) => {
  try {
    let delTodo = await Todo.destroy({
      where: {
        id: req.params.todoId,
      },
    });
    if (!delTodo) {
      return res.send(false); 
    }
    res.send(true);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
