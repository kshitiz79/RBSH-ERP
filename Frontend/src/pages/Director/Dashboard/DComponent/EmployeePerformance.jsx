import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";

const performanceData = [
  { metric: "KPI1", TeamA: 120, TeamB: 110 },
  { metric: "KPI2", TeamA: 98, TeamB: 130 },
  { metric: "KPI3", TeamA: 86, TeamB: 99 },
  { metric: "KPI4", TeamA: 99, TeamB: 100 },
];

const EmployeePerformance = () => (
  <div className="bg-white shadow rounded p-4">
    <h2 className="text-lg font-semibold mb-4">Employee Performance</h2>
    <RadarChart cx={200} cy={150} outerRadius={100} width={400} height={300} data={performanceData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="metric" />
      <PolarRadiusAxis />
      <Radar name="Team A" dataKey="TeamA" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Radar name="Team B" dataKey="TeamB" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      <Tooltip />
    </RadarChart>
  </div>
);

export default EmployeePerformance;
