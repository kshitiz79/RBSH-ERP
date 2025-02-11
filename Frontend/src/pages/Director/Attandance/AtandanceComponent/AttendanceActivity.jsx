import React, { useEffect, useState } from "react";
import { getAttendanceLogs } from "./../../../../Api/AttandanceApi";

const AttendanceActivity = () => {
  const [activities, setActivities] = useState([]);
  const [totalProductionTime, setTotalProductionTime] = useState(0);

  useEffect(() => {
    const fetchAttendanceLogs = async () => {
      try {
        const logs = await getAttendanceLogs();
        if (!Array.isArray(logs)) {
          throw new Error("Invalid data format");
        }

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const mappedActivities = logs
          .filter(log => log.role === "director") // Filter for director role
          .flatMap((log) => {
            const logDate = new Date(log.punch_in);
            if (logDate >= startOfDay && logDate <= endOfDay) {
              const activities = [];

              // Punch In Record
              activities.push({
                type: "Punch In",
                time: log.punch_in,
                production_time: 0,
              });

              // Break Start
              if (log.break_start && !log.break_end) {
                activities.push({
                  type: "On Break",
                  time: log.break_start,
                  production_time: 0,
                });
              }

              // Break End
              if (log.break_start && log.break_end) {
                activities.push({
                  type: "Break Ended",
                  time: log.break_end,
                  production_time: 0,
                });
              }

              // Punch Out Record
              if (log.punch_out) {
                activities.push({
                  type: "Punch Out",
                  time: log.punch_out,
                  production_time: parseFloat(log.production_time) || 0,
                });
              }

              return activities;
            }
            return [];
          });

        // Sum production time from each activity
        const totalTime = mappedActivities.reduce(
          (acc, curr) => acc + curr.production_time,
          0
        );

        setActivities(mappedActivities);
        setTotalProductionTime(totalTime);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchAttendanceLogs();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4 relative h-[430px] overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Today's Activity</h2>
      <div className="relative h-[300px] overflow-y-auto pr-2">
        <ul className="relative pl-6">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <li key={index} className="flex items-center space-x-4 relative mb-6">
                <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gray-300"></div>
                <div className="relative z-10 w-4 h-4 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">{activity.type} at</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  {activity.production_time > 0 && (
                    <p className="text-xs text-gray-500">
                      (Elapsed: {activity.production_time.toFixed(2)} hrs)
                    </p>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No activity recorded today.</p>
          )}
        </ul>
      </div>
      <div className="mt-4 text-center">
        {activities.length > 0 ? (
          <p className="text-sm font-semibold text-gray-700">
            Total Time Spent Today: {totalProductionTime.toFixed(2)} hrs
          </p>
        ) : (
          <p className="text-sm text-gray-500">No activity recorded today.</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceActivity;
