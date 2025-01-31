import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const taskData = [
  { name: "Completed", value: 70 },
  { name: "Pending", value: 30 },
];

const COLORS = ["#0088FE", "#FFBB28"];

const TaskCompletionChart = () => (
  <div className="bg-white shadow rounded p-6">
    <h2 className="text-lg font-semibold mb-4">Task Completion</h2>
    <PieChart width={300} height={200}>
      <Pie
        data={taskData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={70}
        label
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

export default TaskCompletionChart;
