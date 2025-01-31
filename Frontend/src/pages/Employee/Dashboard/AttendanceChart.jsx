import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const attendanceData = [
  { day: "Mon", hours: 3 },
  { day: "Tue", hours: 7 },
  { day: "Wed", hours: 6 },
  { day: "Thu", hours: 8 },
  { day: "Fri", hours: 6 },
  { day: "Sat", hours: 3 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
      <ResponsiveContainer width="100%" height={250}> {/* Increased height */}
        <AreaChart data={attendanceData}>
          <defs>
            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis
            domain={[1, 9]} // Range of Y-axis
            ticks={[1, 3,  4, 5, 6, 7, 8, 9]} // Explicit tick values
            tick={{ fontSize: 14 }} // Increased font size for better visibility
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="hours"
            stroke="#8884d8"
            fill="url(#colorHours)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
