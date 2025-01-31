import React from "react";

const EmployeeTable = ({ employees, onAddClick }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search Employee"
            className="border border-gray-300 rounded-md px-4 py-2 w-80"
          />
          <span className="absolute top-2 right-3 text-gray-400">🔍</span>
        </div>

        <button
          onClick={onAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Employee
        </button>
      </div>
      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-4">#</th>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Mobile</th>
            <th className="p-4">Date of Joining</th>
            <th className="p-4">Salary</th>
            <th className="p-4">Projects</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{index + 1}</td>
              <td className="p-4 flex items-center space-x-3">
                <img
                  src={`https://robohash.org/${employee.id}`}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p>{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                </div>
              </td>
              <td className="p-4">{employee.email}</td>
              <td className="p-4">{employee.mobile}</td>
              <td className="p-4">{employee.dateOfJoining}</td>
              <td className="p-4">{employee.salary}</td>
              <td className="p-4">{employee.projects}</td>
              <td className="p-4 flex space-x-2">
                <button className="text-blue-500">✏️</button>
                <button className="text-red-500">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
