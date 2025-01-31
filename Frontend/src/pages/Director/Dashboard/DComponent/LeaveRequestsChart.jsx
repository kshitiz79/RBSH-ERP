import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const leaveData = [
  { name: "Approved", value: 10 },
  { name: "Pending", value: 5 },
  { name: "Rejected", value: 2 },
];

const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

const LeaveRequestsChart = () => (
  <div className="bg-white shadow rounded p-4">
    <h2 className="text-lg font-semibold mb-4">Leave Requests Status</h2>
    <PieChart width={400} height={300}>
      <Pie
        data={leaveData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
      >
        {leaveData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
);

export default LeaveRequestsChart;
