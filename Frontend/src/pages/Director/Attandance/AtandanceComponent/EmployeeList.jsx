import React from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = ({ employees, onPunchIn, onPunchOut }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onPunchIn={onPunchIn}
          onPunchOut={onPunchOut}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
