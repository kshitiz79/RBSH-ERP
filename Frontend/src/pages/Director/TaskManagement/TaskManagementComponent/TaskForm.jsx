import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    highPriority: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.trim() === "" || task.description.trim() === "") {
      alert("Please fill in all fields!");
      return;
    }
    onAddTask(task);
    setTask({ name: "", description: "", highPriority: false });
  };

  return (
    <div className="bg-white p-6 shadow rounded mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
          placeholder="Task Name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="border p-2 rounded"
        />
        <label className="col-span-2 flex items-center space-x-2">
          <input
            type="checkbox"
            name="highPriority"
            checked={task.highPriority}
            onChange={handleChange}
            className="rounded"
          />
          <span>Mark as High Priority</span>
        </label>
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
