import React from "react";

const AttendanceActivity = ({ activities }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Today Activity</h2>
      <ul className="relative">
        {/* Vertical line */}
        <div className="absolute left-[0.4rem] top-0 w-1 bg-gray-300 h-full"></div>

        {activities.map((activity, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 relative mb-6 last:mb-0"
          >
            {/* Circle */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-green-500"></div>
            {/* Activity Details */}
            <div>
              <p className="text-sm font-medium">{activity.type} at</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceActivity;
