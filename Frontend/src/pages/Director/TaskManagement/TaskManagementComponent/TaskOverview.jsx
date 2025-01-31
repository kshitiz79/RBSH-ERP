import React from "react";

const TaskOverview = ({ tasks, setTasks }) => {
  // Function to toggle high-priority status of a task
  const handleMarkPriority = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, highPriority: !task.highPriority } : task
      )
    );
  };

  return (
    <div className="bg-white p-6 shadow rounded mb-6">
      <h2 className="text-xl font-semibold mb-4">Task Overview</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Add some to get started.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`border p-4 rounded ${
                task.highPriority ? "bg-red-100" : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{task.name}</h3>
                  <p className="text-sm">{task.description}</p>
                </div>
                <button
                  onClick={() => handleMarkPriority(task.id)}
                  className={`px-4 py-2 rounded ${
                    task.highPriority ? "bg-gray-500 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {task.highPriority ? "Remove Priority" : "Mark High Priority"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
  
export default TaskOverview;
