import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: '', completed: false });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:4000/tasks');
    setTasks(response.data);
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:4000/tasks/${editing}`, task);
      setEditing(null);
    } else {
      await axios.post('http://localhost:4000/tasks', task);
    }
    setTask({ title: '', completed: false });
    fetchTasks();
  };

  const editTask = (task) => {
    setTask({ title: task.title, completed: task.completed });
    setEditing(task._id);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:4000/tasks/${id}`);
    fetchTasks();
  };

  const toggleCompletion = async (task) => {
    await axios.put(`http://localhost:4000/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompletion(task)}
            >
              {task.title}
            </span>
            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

