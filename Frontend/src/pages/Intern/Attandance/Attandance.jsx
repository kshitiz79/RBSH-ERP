



import AttendanceList from "../../Director/Attandance/AtandanceComponent/AttendanceList";
import AttendanceActivity from "../../Director/Attandance/AtandanceComponent/AttendanceActivity";

import Statistics from "../../Director/Attandance/AtandanceComponent//Statistics";

import TimeSheet from "../../Director/Attandance/AtandanceComponent//Timesheet";
import { useState } from "react";

const Attendance = () => {
  const activities = [
    { type: "Punch In", time: "10:00 AM" },
    { type: "Punch Out", time: "11:00 AM" },
    { type: "Punch In", time: "11:30 AM" },
    { type: "Punch Out", time: "01:30 PM" },

  ];
  

  const stats = [
    { label: "Today", value: 3.45, total: 8, color: "#4CAF50" },
    { label: "This Week", value: 28, total: 40, color: "#F44336" },
    { label: "This Month", value: 90, total: 160, color: "#FFC107" },
    { label: "Remaining", value: 70, total: 160, color: "#2196F3" },
    { label: "Overtime", value: 5, total: 10, color: "#FFEB3B" },
  ];

  const timesheet = {
    date: "11 Mar 2019",
    punchIn: "Wed, 11th Jan 2025 10:00 AM",
    hours: 3.45, // Hours worked
    break: 1.21, // Break hours
    overtime: 3, // Overtime hours
  };
  
  const attendanceData = [
    { date: "19 Feb 2025", punchIn: "10 AM", punchOut: "7 PM", production: "9 hrs", break: "1 hrs", overtime: "2 hrs" },
    { date: "20 Feb 2025", punchIn: "10 AM", punchOut: "7 PM", production: "9 hrs", break: "1 hrs", overtime: "0 hrs" },
    { date: "21 Feb 2025", punchIn: "10 AM", punchOut: "7 PM", production: "9 hrs", break: "1 hrs", overtime: "0 hrs" },
    { date: "22 Feb 2025", punchIn: "10 AM", punchOut: "7 PM", production: "9 hrs", break: "1 hrs", overtime: "1 hrs" },
    { date: "23 Feb 2025", punchIn: "10 AM", punchOut: "7 PM", production: "9 hrs", break: "1 hrs", overtime: "3 hrs" },
    { date: "24 Feb 2025", punchIn: "10 AM", punchOut: "7 PM", production: "9 hrs", break: "1 hrs", overtime: "0 hrs" },
  ];


  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Amanda Kherr",
      image: "https://via.placeholder.com/64",
    },
    {
      id: 2,
      name: "Angel Johnson",
      image: "https://via.placeholder.com/64",
    },
    {
      id: 3,
      name: "Alexander Kherr",
      image: "https://via.placeholder.com/64",
    },
    {
      id: 4,
      name: "Austin Kherr",
      image: "https://via.placeholder.com/64",
    },
    {
      id: 5,
      name: "Aada Kherr",
      image: "https://via.placeholder.com/64",
    },
  ]);





  const handlePunchIn = (id) => {
    alert(`Punch In for Employee ID: ${id}`);
  };

  const handlePunchOut = (id) => {
    alert(`Punch Out for Employee ID: ${id}`);
  };



  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Timesheet */}
      <TimeSheet timesheet={timesheet} />

      {/* Statistics */}
      <Statistics stats={stats} />

      {/* Today's Activity */}
      <AttendanceActivity activities={activities} />

     
    </div>

<div className="p-6">
<AttendanceList attendanceData={attendanceData} />
</div>


</>


  );
};

export default Attendance;
