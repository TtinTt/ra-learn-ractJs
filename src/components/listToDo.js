import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "../actions/todoAction";
import React, { useState } from "react";

export default function ListToDo() {
  // lấy về state.todos từ store
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [valueInput, setValueInput] = useState("");

  const handleGetValue = async (event) => {
    await setValueInput(event.target.value);
    await console.log(valueInput);
  };

  const handleaddTodo = async () => {
    let todo = { title: valueInput };
    if (todos.length === 0) {
      todo.id = 1;
    } else {
      todo.id = todos[todos.length - 1].id + 1;
    }
    dispatch(addTodo(todo));
    setValueInput("");
    await console.log(todos);
  };

  const handleDelete = async (todoid) => {
    dispatch(deleteTodo(todoid));
    await console.log(todoid);
  };

  const handleEdit = async (todo) => {
    dispatch(updateTodo(todo.id, valueInput, todo.completed));
    setValueInput("");
    await console.log(todo.id);
  };

  const handleComplete = async (todo) => {
    dispatch(updateTodo(todo.id, todo.title, !todo.completed));
    await console.log(todo);
  };

  const todolist = todos.map((todo, index) => {
    return (
      <tr>
        <td>{todo.id}</td>
        <td>{todo.title}</td>
        <td>{todo.completed ? "đã hoàn thành" : "chưa hoàn thành"}</td>
        <td>
          <button onClick={() => handleComplete(todo)}>Cập nhật</button>

          <button onClick={() => handleEdit(todo)}>Sửa</button>

          <button onClick={() => handleDelete(todo.id)}>Xóa</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Danh sách công việc</h1>
      <thead>
        <tr>
          <th>Thứ tự</th>
          <th>Công việc</th>
          <th>Trạng thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{todolist}</tbody>

      <input value={valueInput} onChange={handleGetValue}></input>
      <button onClick={handleaddTodo}>Thêm công việc</button>
    </div>
  );
}
