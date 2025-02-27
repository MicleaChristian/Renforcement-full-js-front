import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  // States for creating new tasks
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  // States for editing
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Fetch tasks from backend
  const loadTasks = async () => {
    try {
      const res = await axios.get('http://localhost:3001/tasks', { withCredentials: true });
      setTasks(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // Create a new task
  const handleAddTask = async () => {
    if (!newTitle.trim()) return;
    try {
      await axios.post(
        'http://localhost:3001/tasks',
        {
          title: newTitle,
          description: newDescription,
          deadline: newDeadline
        },
        { withCredentials: true }
      );
      setNewTitle('');
      setNewDescription('');
      setNewDeadline('');
      loadTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding task');
    }
  };

  // Mark a task as completed
  const handleCompleteTask = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/tasks/${id}/complete`, {}, { withCredentials: true });
      loadTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Error completing task');
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`, { withCredentials: true });
      loadTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting task');
    }
  };

  // Start editing (populate the form with current values)
  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDeadline(task.deadline);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle('');
    setEditDescription('');
    setEditDeadline('');
  };

  // Submit edited data to the backend
  const handleUpdateTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:3001/tasks/${id}`,
        {
          title: editTitle,
          description: editDescription,
          deadline: editDeadline
        },
        { withCredentials: true }
      );
      loadTasks();
      handleCancelEdit();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating task');
    }
  };

  return (
    <div>
      <h1>My To-Do List</h1>

      {/* CREATE NEW TASK FORM */}
      <div style={{ marginBottom: '1rem' }}>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <br />
        <input
          type="date"
          placeholder="Deadline"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
        />
        <br />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* TASK LIST */}
      <ul>
        {tasks.map((task) => {
          // If this task is being edited, show the edit form
          if (editingTaskId === task.id) {
            return (
              <li key={task.id} style={{ marginBottom: '1rem' }}>
                <strong>Edit Task #{task.id}</strong> 
                <br />
                Created by: {task.user}
                <br />
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <br />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                />
                <br />
                <input
                  type="date"
                  value={editDeadline}
                  onChange={(e) => setEditDeadline(e.target.value)}
                  placeholder="Deadline"
                />
                <br />
                <button onClick={() => handleUpdateTask(task.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </li>
            );
          } else {
            // Normal display mode
            return (
              <li key={task.id} style={{ marginBottom: '1rem' }}>
                <strong>
                  {task.title} <small>(#{task.id})</small>
                </strong>
                <br />
                Created by: <em>{task.user}</em>
                <br />
                {task.description && <span>Description: {task.description}</span>}
                <br />
                {task.deadline && <span>Deadline: {task.deadline}</span>}
                <br />
                Status: {task.status}
                <br />

                {task.status === 'pending' && (
                  <>
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </>
                )}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default TodoList;