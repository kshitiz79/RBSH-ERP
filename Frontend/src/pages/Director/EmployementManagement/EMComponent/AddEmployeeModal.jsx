import React, { useState } from "react";

const AddEmployeeModal = ({ onClose, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    mobile: "",
    dateOfJoining: "",
    salary: "",
    projects: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onAddEmployee(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h3 className="text-xl font-bold mb-4">Add New Employee</h3>
        <div className="space-y-3">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium capitalize">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
