import React, { useState, useEffect } from "react";
import { getAttendanceLogs } from "./../../../../Api/AttandanceApi";

const AttendanceList = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logs = await getAttendanceLogs();

        // Aggregate logs by date
        const aggregatedData = logs.reduce((acc, log) => {
          const date = new Date(log.punch_in).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = {
              date,
              punchIn: log.punch_in,
              punchOut: log.punch_out || null,
              breakDuration: log.break_duration || 0,
            };
          } else {
            // Earliest punch-in
            if (new Date(log.punch_in) < new Date(acc[date].punchIn)) {
              acc[date].punchIn = log.punch_in;
            }
            // Latest punch-out
            if (
              log.punch_out &&
              (!acc[date].punchOut ||
                new Date(log.punch_out) > new Date(acc[date].punchOut))
            ) {
              acc[date].punchOut = log.punch_out;
            }
            acc[date].breakDuration += log.break_duration || 0;
          }
          return acc;
        }, {});

        const formattedData = Object.values(aggregatedData).map((item) => ({
          ...item,
          productionTime: calculateProductionTime(
            item.punchIn,
            item.punchOut,
            item.breakDuration
          ),
          overtime: 0,
        }));

        setAttendanceData(formattedData);
      } catch (error) {
        console.error("Error fetching attendance logs:", error);
      }
    };

    fetchData();
  }, []);

  /**
   * Matches the same offset logic that your Statistics or TimeSheet might be using,
   * so the hours are consistent.
   */
  const calculateProductionTime = (punchIn, punchOut, breakDuration) => {
    const punchInMs = new Date(punchIn).getTime();
    const now = new Date();

    // If there's no punchOut, calculate real-time from punchIn to "now"
    if (!punchOut) {
      // 1) Option A: EXACT MATCH WITH TIMEZONE OFFSET (like in your TimeSheet)
      const offsetMillis = now.getTimezoneOffset() * 60 * 1000;
      const diffMs = now.getTime() - punchInMs - offsetMillis; 
      const hoursElapsed = diffMs / (1000 * 60 * 60);

      return hoursElapsed - breakDuration;
    }

    // If punchOut is present, normal calculation
    const punchOutMs = new Date(punchOut).getTime();
    // 2) Subtract offset from both ends the same way, or omit it from both
    // For simplicity, do standard difference with no offset here:
    const diffMs = punchOutMs - punchInMs;
    const hoursElapsed = diffMs / (1000 * 60 * 60);

    return hoursElapsed - breakDuration;
  };

  // Re-run the real-time update every second for any row that doesn't have punchOut
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAttendanceData((prevData) =>
        prevData.map((item) => {
          if (!item.punchOut) {
            return {
              ...item,
              productionTime: calculateProductionTime(
                item.punchIn,
                null,
                item.breakDuration
              ),
            };
          }
          return item;
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (datetime) => new Date(datetime).toLocaleTimeString();

  const formatDuration = (durationInHours) => {
    const hours = Math.floor(durationInHours);
    const minutes = Math.round((durationInHours - hours) * 60);
    return `${hours} hrs ${minutes} mins`;
  };

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4">Attendance List</h2>
      <table className="w-full text-left border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-200">S. No</th>
            <th className="p-2 border border-gray-200">Date</th>
            <th className="p-2 border border-gray-200">Punch In</th>
            <th className="p-2 border border-gray-200">Punch Out</th>
            <th className="p-2 border border-gray-200">Production</th>
            <th className="p-2 border border-gray-200">Break</th>
            <th className="p-2 border border-gray-200">Overtime</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-200">{index + 1}</td>
              <td className="p-2 border border-gray-200">{item.date}</td>
              <td className="p-2 border border-gray-200">
                {formatTime(item.punchIn)}
              </td>
              <td className="p-2 border border-gray-200">
                {item.punchOut ? formatTime(item.punchOut) : "Still Punched In"}
              </td>
              <td className="p-2 border border-gray-200">
                {formatDuration(item.productionTime)}
              </td>
              <td className="p-2 border border-gray-200">
                {formatDuration(item.breakDuration)}
              </td>
              <td className="p-2 border border-gray-200">
                {formatDuration(item.overtime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
