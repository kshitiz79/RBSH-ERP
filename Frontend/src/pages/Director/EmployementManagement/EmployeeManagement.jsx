
import React, { useState } from "react";
import EmployeeTable from "./EMComponent/EmployeeTable";
import AddEmployeeModal from "./EMComponent/AddEmployeeModal";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "mc",
      role: "SEO",
      email: "r@gmail.com",
      mobile: "9786838",
      dateOfJoining: "Tuesday, January 2, 2024",
      salary: "12000",
      projects: "10",
    },
    {
      id: 2,
      name: "Mark",
      role: "Wer",
      email: "mark@gmail.com",
      mobile: "87838",
      dateOfJoining: "Tues4",
      salary: "12000",
      projects: "10",
    },
    {
      id: 3,
      name: "Sam Sm",
      role: "Web Deser",
      email: "sam@gmail.com",
      mobile: "7788838",
      dateOfJoining: "Friday4",
      salary: "12000",
      projects: "10",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, { ...newEmployee, id: employees.length + 1 }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Employee Management</h2>
      <EmployeeTable employees={employees} onAddClick={() => setShowModal(true)} />
      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onAddEmployee={addEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
