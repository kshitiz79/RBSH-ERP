import React from "react";

const AttendanceList = ({ attendanceData }) => {
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
              <td className="p-2 border border-gray-200">{item.punchIn}</td>
              <td className="p-2 border border-gray-200">{item.punchOut}</td>
              <td className="p-2 border border-gray-200">{item.production}</td>
              <td className="p-2 border border-gray-200">{item.break}</td>
              <td className="p-2 border border-gray-200">{item.overtime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
