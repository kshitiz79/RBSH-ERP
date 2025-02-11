import React, { useState, useEffect } from "react";
import { getStatistics } from "./../../../../Api/AttandanceApi"; // Adjust path as needed

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [baseTodayHours, setBaseTodayHours] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics(); 
        setStats(data);

        // Extract the "Today" hours as a number
        const todayStat = data.find((item) => item.label === "Today");
        if (todayStat) {
          const numericValue = parseFloat(todayStat.value);
          setBaseTodayHours(isNaN(numericValue) ? 0 : numericValue);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    let intervalId = null;
    const savedPunchIn = localStorage.getItem("punchInTime");

    if (savedPunchIn) {
      const { date, time } = JSON.parse(savedPunchIn);
      const todayStr = new Date().toLocaleDateString();

      if (date === todayStr) {
        intervalId = setInterval(() => {
          const now = new Date().getTime();
          // How many hours have elapsed since punch-in
          const partialHours = (now - time) / 3600000;

          setStats((prevStats) =>
            prevStats.map((stat) => {
              if (stat.label === "Today") {
                return {
                  ...stat,
                  // Add partial hours to the base from the server
                  value: baseTodayHours + partialHours,
                };
              }
              return stat;
            })
          );
        }, 1000);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [baseTodayHours]);

  if (!stats || stats.length === 0) {
    return (
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-7">Statistics</h2>
        <p>No statistics available for today.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-7">Statistics</h2>
      <ul className="space-y-4">
      {stats.map((stat, index) => {
  // Convert stat.value to a real number
  let numericValue = parseFloat(stat.value);
  if (isNaN(numericValue)) numericValue = 0;
  
  // Ensure non-negative
  const safeValue = numericValue < 0 ? 0 : numericValue;

  // If stat.total is also sometimes a string, parse that too:
  let numericTotal = parseFloat(stat.total);
  if (isNaN(numericTotal)) numericTotal = 0; 

  // Compute progress bar width and cap it at 100%
  const percentage =
    numericTotal > 0 ? Math.min((safeValue / numericTotal) * 100, 100) : 100;

  return (
    <li
      key={index}
      className="space-y-1 border border-gray-300 p-2 rounded-2xl"
    >
      <div className="flex justify-between">
        <p className="text-sm">{stat.label}</p>
        <p className="text-sm">
          {safeValue.toFixed(2)} / {numericTotal} hrs
        </p>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: stat.color,
          }}
        ></div>
      </div>
    </li>
  );
})}

      </ul>
    </div>
  );
};

export default Statistics;
