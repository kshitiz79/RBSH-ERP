


import EmployeeList from "./AtandanceComponent/EmployeeList";
import AttendanceActivity from "./AtandanceComponent/AttendanceActivity";
import AttendanceList from "./AtandanceComponent/AttendanceList";
import Statistics from "./AtandanceComponent/Statistics";
import { punchIn, punchOut } from "./../../../Api/AttandanceApi";
import TimeSheet from "./AtandanceComponent/Timesheet";
import React, { useState, useEffect } from "react";

const AttendanceManagement = () => {


  const [hasPunchedIn, setHasPunchedIn] = useState(false); // Tracks punch-in state
  const [timesheet, setTimesheet] = useState({
    date: new Date().toLocaleDateString(),
    punchIn: null,
    hours: 0,
    break: 0,
    overtime: 0,
  });
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // Timer in seconds
  const [timerInterval, setTimerInterval] = useState(null);
  const [breakTime, setBreakTime] = useState(0);

  const handleStartBreak = () => setIsOnBreak(true);
  const handleEndBreak = () => setIsOnBreak(false);


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


  const handlePunchIn = async () => {
    try {
      const result = await punchIn(1, "employee"); // Replace with dynamic user ID and role
      alert(`Punch In successful at ${result.punch_in}`);
      setHasPunchedIn(true);
      setTimesheet((prev) => ({
        ...prev,
        date: new Date().toLocaleDateString(),
        punchIn: result.punch_in,
      }));

      // Start Timer
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    } catch (error) {
      console.error("Error punching in:", error);
    }
  };

  // Handle Punch Out
  const handlePunchOut = async () => {
    try {
      const result = await punchOut(1); // Replace with dynamic user ID
      alert(`Punch Out successful! Production Time: ${result.production_time} hrs`);
      setHasPunchedIn(false);
      setTimesheet((prev) => ({
        ...prev,
        hours: result.production_time,
        overtime: result.overtime,
      }));

      // Stop Timer
      clearInterval(timerInterval);
      setTimerInterval(null);
      setElapsedTime(0);
    } catch (error) {
      console.error("Error punching out:", error);
    }
  };

  useEffect(() => {
    // Cleanup timer when the component unmounts
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  useEffect(() => {
    let timer;
    if (isOnBreak) {
      timer = setInterval(() => {
        setBreakTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOnBreak]);




  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Timesheet */}
      <TimeSheet
      timesheet={{ date: "2025-01-21", punchIn: "09:00", break: breakTime / 3600 }}
      hasPunchedIn={hasPunchedIn}
      isOnBreak={isOnBreak}
      onPunchIn={handlePunchIn}
      onPunchOut={handlePunchOut}
      onStartBreak={handleStartBreak}
      onEndBreak={handleEndBreak}
      elapsedTime={elapsedTime}
    />

      {/* Statistics */}
      <Statistics stats={stats} />

      {/* Today's Activity */}
      <AttendanceActivity activities={activities} />

     
    </div>

<div className="p-6">
<AttendanceList attendanceData={attendanceData} />
</div>

<div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Attendance Management</h1>
      <EmployeeList
        employees={employees}
        onPunchIn={handlePunchIn}
        onPunchOut={handlePunchOut}
      />
    </div>
</>


  );
};

export default AttendanceManagement;
