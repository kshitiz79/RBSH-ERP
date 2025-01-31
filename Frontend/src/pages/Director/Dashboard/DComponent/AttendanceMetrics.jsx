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
  { day: "Mon", "2024": 40, "2023": 30, "2022": 6 },
  { day: "Tue", "2024": 85, "2023": 45, "2022": 30 },
  { day: "Wed", "2024": 78, "2023": 68, "2022": 50 },
  { day: "Thu", "2024": 55, "2023": 40, "2022": 25 },
  { day: "Fri", "2024": 9, "2023": 85, "2022": 40 },
];

const AttendanceMetrics = () => {
  return (
    <div className="bg-white shadow rounded p-6">
      {/* Header Section */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full">
          <span className="text-indigo-600 font-bold">📊</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Attendance Trends</h2>
          <p className="text-sm text-gray-500">Overview of Weekly Attendance</p>
        </div>
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={attendanceData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradient Colors */}
          <defs>
            <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2023" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2022" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8A2BE2" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF00FF" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Chart Elements */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="2024"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#color2024)"
          />
          <Area
            type="monotone"
            dataKey="2023"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#color2023)"
          />
          <Area
            type="monotone"
            dataKey="2022"
            stroke="#ffc658"
            fillOpacity={1}
            fill="url(#color2022)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceMetrics;
