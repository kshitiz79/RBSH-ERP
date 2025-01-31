import React from "react";
import LeaveRequests from "./LeaveRequest";

const LeaveManagement = () => {
  const requests = [
    { id: 1, name: "John Doe", start: "2025-01-10", end: "2025-01-12", reason: "Vacation" },
    { id: 2, name: "Jane Smith", start: "2025-01-15", end: "2025-01-18", reason: "Medical Leave" },
  ];

  return (
    <div>
      <h1>Leave Management</h1>
      <LeaveRequests requests={requests} />
    </div>
  );
};

export default LeaveManagement;
