import React from "react";

const ProjectOverview = ({ projects }) => (
  <div className="bg-white shadow rounded p-6">
    <h2 className="text-lg font-semibold mb-4">Project Overview</h2>
    <ul className="space-y-3">
      {projects.map((project, index) => (
        <li key={index} className="flex justify-between">
          <span>{project.name}</span>
          <span
            className={`${
              project.status === "Completed"
                ? "text-green-500"
                : project.status === "In Progress"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {project.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default ProjectOverview;
