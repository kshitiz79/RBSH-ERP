import React from "react";

const projectData = [
  { name: "Completed", value: 60 },
  { name: "In Progress", value: 30 },
  { name: "Pending/Delayed", value: 10 },
];

const ProjectProgress = () => (
  <div className="bg-white shadow rounded p-4">
    <h2 className="text-lg font-semibold mb-4">Project Progress</h2>
    <ul className="space-y-2">
      {projectData.map((project, index) => (
        <li key={index} className="flex justify-between items-center">
          <span>{project.name}</span>
          <div className="w-full bg-gray-200 rounded-full h-4 mx-2">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${project.value}%` }}
            ></div>
          </div>
          <span>{project.value}%</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ProjectProgress;
