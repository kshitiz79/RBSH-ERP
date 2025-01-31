import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const taskData = [
  { name: "High Priority", value: 15 },
  { name: "Low Priority", value: 20 },
];

const COLORS = ["#FF8042", "#0088FE"];

const TaskCompletion = () => (
  <div className="bg-white shadow rounded p-4">
    <h2 className="text-lg font-semibold mb-4">Task Completion</h2>
    <PieChart width={400} height={300}>
      <Pie
        data={taskData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
      >
        {taskData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
);

export default TaskCompletion;
