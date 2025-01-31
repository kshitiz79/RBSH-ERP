import React from "react";

const Statistics = ({ stats }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-7">Statistics</h2>
      <ul className="space-y-4 ">
        {stats.map((stat, index) => (
          <li key={index} className="space-y-1 border border-gray-300 p-2 rounded-2xl">
            <div className="flex justify-between">
              <p className="text-sm">{stat.label}</p>
              <p className="text-sm">
                {stat.value} / {stat.total} hrs
              </p>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className={`h-2 rounded-full`}
                style={{
                  width: `${(stat.value / stat.total) * 100}%`,
                  backgroundColor: stat.color,
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Statistics;
