import React, { useState, useEffect, useRef } from "react";

import EmployeeList from "./AtandanceComponent/EmployeeList";
import AttendanceActivity from "./AtandanceComponent/AttendanceActivity";
import AttendanceList from "./AtandanceComponent/AttendanceList";
import Statistics from "./AtandanceComponent/Statistics";
import TimeSheet from "./AtandanceComponent/Timesheet";
import { punchIn, punchOut, getAttendanceLogs, getStatistics } from "../../../Api/AttandanceApi";

const AttendanceManagement = () => {
  const [hasPunchedIn, setHasPunchedIn] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(0);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);



  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;
  const userRole = user.role;



  const intervalRef = useRef(null);


  useEffect(() => {
    const fetchAttendanceLogs = async () => {
      try {
        const logs = await getAttendanceLogs();
        console.log("Fetched Logs:", logs);
        setActivities(logs);
        setAttendanceData(logs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchAttendanceLogs();
  }, []);




  const refreshStats = async () => {
    try {
      const statsData = await getStatistics();
      setStats(statsData);
    } catch (error) {
      console.error("Error refreshing stats:", error);
    }
  };
  
  useEffect(() => {
    refreshStats(); // Initial fetch
  }, []);







  const startTimer = (startTime) => {
    intervalRef.current = setInterval(() => {
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset() * 60 * 1000; // Offset in milliseconds
      const elapsed = Math.floor((now.getTime() - startTime + timezoneOffset) / 1000);
      setElapsedTime(elapsed);
    }, 1000);
  };
  
  

  const handlePunchIn = async () => {
    try {
      const result = await punchIn(userId, userRole);
      alert(`Punch In successful at ${result.punch_in}`);

      const punchInTime = new Date(result.punch_in).getTime();
      const today = new Date().toLocaleDateString();
      localStorage.setItem("punchInTime", JSON.stringify({ date: today, time: punchInTime }));

      setHasPunchedIn(true);
      setElapsedTime(0); // Reset elapsed time on punch-in
      startTimer(punchInTime);
    } catch (error) {
      console.error("Error punching in:", error);
    }
  };

  const handlePunchOut = async () => {
    try {
      const result = await punchOut(userId);
      alert(`Punch Out successful! Production Time: ${result.production_time} hrs`);
  
      setHasPunchedIn(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setElapsedTime(0);
      localStorage.removeItem("punchInTime");
    } catch (error) {
      console.error("Error punching out:", error.response ? error.response.data : error.message);
      alert("Error punching out! Check console for details.");
    }
  };
  

  useEffect(() => {
    const savedPunchIn = localStorage.getItem("punchInTime");
    if (savedPunchIn) {
      const { date, time } = JSON.parse(savedPunchIn);
      const today = new Date().toLocaleDateString();
      if (date === today) {
        setHasPunchedIn(true);
        startTimer(time);
      }
    }
  
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    let timer;
    if (isOnBreak) {
      timer = setInterval(() => {
        setBreakTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOnBreak]);

  const handleStartBreak = () => setIsOnBreak(true);
  const handleEndBreak = () => setIsOnBreak(false);


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







  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Timesheet */}
      <TimeSheet
     
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
