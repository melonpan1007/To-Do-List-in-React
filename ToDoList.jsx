import React, { useEffect, useState, useRef } from "react";
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      if (editIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === editIndex ? newTask : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks(t => [...t, newTask]);
      }
      setNewTask("");
      inputRef.current.focus();
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function editTask(index) {
    setNewTask(tasks[index]);
    setEditIndex(index);
    inputRef.current.focus();
  }

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="to-do-list-container">
      <h1>What's the Plan for Today?</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a Task..."
          value={newTask}
          onChange={handleInputChange}
          ref={inputRef}
          className="centered-input"
        />
        <button className="add-button" onClick={addTask}>
          {editIndex !== null ? <FaEdit /> : "Add"}
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span className="text">{task}</span>
            <button className="edit-button" onClick={() => editTask(index)}>
              <FaEdit />
            </button>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              <FaTrash />
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              <FaArrowUp />
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              <FaArrowDown />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
