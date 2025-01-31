import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ employee, onPunchIn, onPunchOut }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center">
      {/* Employee Image */}
      <img
        src={employee.image}
        alt={employee.name}
        className="w-16 h-16 rounded-full mb-4"
      />

      {/* Employee Name */}
      <h3 className="text-sm font-semibold">{employee.name}</h3>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 space-x-2">
        {/* Punch In */}
        {!employee.isPunchedIn ? (
          <button
            onClick={() => onPunchIn(employee.id)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white"
          >
            P
          </button>
        ) : (
          <button
            disabled
            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            P
          </button>
        )}

        {/* View Details */}
        <button
          onClick={() => navigate(`/employee/${employee.id}`)}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-700"
        >
          👁️
        </button>

        {/* Punch Out */}
        {employee.isPunchedIn ? (
          <button
            onClick={() => onPunchOut(employee.id)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-500 text-white"
          >
            L
          </button>
        ) : (
          <button
            disabled
            className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            L
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
