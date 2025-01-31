import React from "react";

const TimeSheet = ({
  timesheet,
  onPunchIn,
  onPunchOut,
  onStartBreak,
  onEndBreak,
  hasPunchedIn,
  isOnBreak,
  elapsedTime,
}) => {
  // Format elapsed time to HH:mm:ss
  const formatElapsedTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-blue-600 text-xl font-bold">Timesheet</h2>
        <span className="text-gray-500 text-sm">{timesheet?.date || "N/A"}</span>
      </div>

      {/* Punch In Info */}
      <div className="border border-gray-200 p-1 rounded-xl mb-6 ">
        <p className="text-gray-700 text-sm font-medium mb-1">Punch In at</p>
        <p className="text-gray-500 text-sm">{timesheet?.punchIn || "N/A"}</p>
      </div>

      {/* Circular Timer Display */}
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
              strokeDashoffset={314 - ((timesheet?.hours || 0) / 8) * 314}
              strokeLinecap="round"
            ></circle>
          </svg>

          {/* Timer or Hours Worked */}
          <p className="absolute inset-0 flex items-center justify-center text-lg font-bold">
            {hasPunchedIn
              ? formatElapsedTime(elapsedTime)
              : `${(timesheet?.hours || 0).toFixed(2)} hrs`}
          </p>
        </div>
      </div>

      {/* Punch In / Punch Out Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {!hasPunchedIn ? (
          <button
            onClick={onPunchIn}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
          >
            Punch In
          </button>
        ) : (
          <>
            <button
              onClick={onPunchOut}
              className="bg-green-500 text-white px-4 py-2 rounded-xl"
            >
              Punch Out
            </button>
            {isOnBreak ? (
              <button
                onClick={onEndBreak}
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
              >
                End Break
              </button>
            ) : (
              <button
                onClick={onStartBreak}
                className="bg-gray-500 text-white px-4 py-2 rounded-xl"
              >
                Start Break
              </button>
            )}
          </>
        )}
      </div>

      {/* Break and Overtime */}
      <div className="flex justify-between mt-6 text-sm">
        <div className="text-center">
          <p className="text-gray-500">BREAK</p>
          <p className="text-gray-800 font-bold">
            {(timesheet?.break ?? 0).toFixed(2)} hrs
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Overtime</p>
          <p className="text-gray-800 font-bold">
            {(timesheet?.overtime ?? 0).toFixed(2)} hrs
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeSheet;
