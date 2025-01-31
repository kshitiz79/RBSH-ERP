import React, { useState } from "react";

const ProjectForm = ({ onAddProject }) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    assignedTo: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProject(project);
    setProject({ name: "", description: "", assignedTo: "", deadline: "" });
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="assignedTo"
          value={project.assignedTo}
          onChange={handleChange}
          placeholder="Assign to (Employee/Team)"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="date"
          name="deadline"
          value={project.deadline}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="border border-gray-300 p-2 rounded col-span-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded col-span-2 hover:bg-indigo-500 transition"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
