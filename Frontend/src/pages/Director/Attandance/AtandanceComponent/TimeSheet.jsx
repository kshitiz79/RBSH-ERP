import React, { useState, useEffect, useRef } from "react";

const TimeSheet = ({
  onPunchIn,
  onPunchOut,
  onStartBreak,
  onEndBreak,
  hasPunchedIn,
  isOnBreak,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [punchInTime, setPunchInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [breakStartTime, setBreakStartTime] = useState(null);
  const [totalBreakTime, setTotalBreakTime] = useState(0);
  const intervalRef = useRef(null);



  // Helper functions
  const formatElapsedTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const formatDate = (date) => date.toLocaleDateString();
  const formatTime = (date) => date.toLocaleTimeString();

  // Load state from localStorage on mount
  useEffect(() => {
    const loadState = () => {
      const storedData = localStorage.getItem("timeSheetData");
      if (storedData) {
        const { date, punchIn, breakStart, totalBreak } = JSON.parse(storedData);
        const storedDate = new Date(date).toLocaleDateString();
        const today = new Date().toLocaleDateString();
        if (storedDate === today) {
          if (punchIn) {
            const punchInDate = new Date(punchIn);
            setPunchInTime(punchInDate);
            const now = new Date();
            const secondsElapsed = Math.floor((now - punchInDate) / 1000);
            setElapsedTime(secondsElapsed);
            startTimer(punchInDate);
          }
          if (breakStart) {
            setBreakStartTime(new Date(breakStart));
          }
          if (totalBreak) {
            setTotalBreakTime(totalBreak);
          }
        } else {
          localStorage.removeItem("timeSheetData");
        }
      }
    };

    loadState();

    // Listen for storage events to sync across tabs
    const handleStorageChange = (event) => {
      if (event.key === "timeSheetData") {
        loadState();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Start the timer
  const startTimer = (startTime) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const now = new Date();
      const secondsElapsed = Math.floor((now - startTime) / 1000);
      setElapsedTime(secondsElapsed);
    }, 1000);
  };

  // Handle punch-in
  const handlePunchIn = () => {
    const now = new Date();

    setPunchInTime(now);
    localStorage.setItem(
      "timeSheetData",
      JSON.stringify({ date: now, punchIn: now, totalBreak: 0 })
    );
    startTimer(now);
    onPunchIn();
  };

  // Handle punch-out
  const handlePunchOut = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setPunchInTime(null);
    setElapsedTime(0);
    localStorage.removeItem("timeSheetData");
    onPunchOut();
  };

  // Handle start break
  const handleStartBreak = () => {
    const now = new Date();
    setBreakStartTime(now);
    const storedData = JSON.parse(localStorage.getItem("timeSheetData"));
    storedData.breakStart = now;
    localStorage.setItem("timeSheetData", JSON.stringify(storedData));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    onStartBreak();
  };

  // Handle end break
  const handleEndBreak = () => {
    const now = new Date();
    if (breakStartTime) {
      const breakDuration = Math.floor((now - breakStartTime) / 1000);
      const newTotalBreakTime = totalBreakTime + breakDuration;
      setTotalBreakTime(newTotalBreakTime);
      setBreakStartTime(null);
      const storedData = JSON.parse(localStorage.getItem("timeSheetData"));
      storedData.totalBreak = newTotalBreakTime;
      delete storedData.breakStart;
      localStorage.setItem("timeSheetData", JSON.stringify(storedData));
    }
    if (punchInTime) {
      startTimer(punchInTime);
    }
    onEndBreak();
  };

  // Update current date every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now.toLocaleDateString() !== currentDate.toLocaleDateString()) {
        setPunchInTime(null);
        setElapsedTime(0);
        setBreakStartTime(null);
        setTotalBreakTime(0);
        localStorage.removeItem("timeSheetData");
      }
      setCurrentDate(now);
    }, 60000);
    return () => clearInterval(timer);
  }, [currentDate]);

  return (



    <div className="bg-white shadow rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-blue-600 text-xl font-bold">Timesheet</h2>
        <span className="text-gray-500 text-sm">{formatDate(currentDate)}</span>
      </div>

      <div className="border border-gray-200 p-1 rounded-xl mb-6">
        <p className="text-gray-700 text-sm font-medium mb-1">Punch In at</p>
        <p className="text-gray-500 text-sm">
          {punchInTime ? formatTime(punchInTime) : "N/A"}
        </p>
      </div>

      <div className="flex justify-center items-center mb-6">
        <div className="relative">
          <svg className="w-32 h-32 relative">
            <circle
              cx="50%"
              cy="50%"
              r="50"
              className="text-gray-300"
              strokeWidth="10"
              fill="none"
              stroke="currentColor"
            ></circle>
            <circle
              cx="50%"
              cy="50%"
              r="50"
              className="text-blue-500"
              strokeWidth="10"
              fill="none"
              strokeDasharray="314"
              strokeDashoffset={314 - (elapsedTime / 28800) * 314} // Assuming 8-hour workday
              strokeLinecap="round"
            ></circle>
          </svg>
          <p className="absolute inset-0 flex items-center justify-center text-lg font-bold">
            {formatElapsedTime(elapsedTime)}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {!hasPunchedIn ? (
          
          <button
        
            onClick={handlePunchIn}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
          >
            Punch In
          </button>
        ) : (
          <>
            <button
              onClick={handlePunchOut}
              className="bg-green-500 text-white px-4 py-2 rounded-xl"
            >
              Punch Out
            </button>
            {isOnBreak ? (
              <button
                onClick={handleEndBreak}
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
              >
                End Break
              </button>
            ) : (
              <button
                onClick={handleStartBreak}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl"
              >
                Start Break
              </button>
            )}
          </>
        )}
      </div>

      <div className="flex justify-between mt-6 text-sm">
        <div className="text-center">
          <p className="text-gray-500">BREAK</p>
          <p className="text-gray-800 font-bold">
            {(totalBreakTime / 3600).toFixed(2)} hrs
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Overtime</p>
          <p className="text-gray-800 font-bold">
            {((elapsedTime - 28800) / 3600).toFixed(2)} hrs
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeSheet;
