import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const financialData = [
  { name: "Jan", Revenue: 4000, Expenses: 2400 },
  { name: "Feb", Revenue: 3000, Expenses: 1398 },
  { name: "Mar", Revenue: 2000, Expenses: 9800 },
];

const FinancialInsights = () => (
  <div className="bg-white shadow rounded p-4">
    <h2 className="text-lg font-semibold mb-4">Financial Insights</h2>
    <BarChart
      width={400}
      height={300}
      data={financialData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Revenue" fill="#8884d8" />
      <Bar dataKey="Expenses" fill="#82ca9d" />
    </BarChart>
  </div>
);

export default FinancialInsights;
