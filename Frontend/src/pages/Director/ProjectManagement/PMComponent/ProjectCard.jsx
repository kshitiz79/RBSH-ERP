import React, { useState } from "react";

const ProjectCard = ({ project, setProjects, projects }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDelete = () => {
    setProjects(projects.filter((p) => p.id !== project.id));
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-xl text-indigo-600">{project.name}</h3>
          <p className="text-sm text-gray-600">{project.description}</p>
          <p className="text-sm text-gray-700">
            <strong>Assigned To:</strong> {project.assignedTo}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Deadline:</strong> {project.deadline}
          </p>
        </div>
        <div>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded mr-2 hover:bg-indigo-500 transition"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "View Details"}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
            onClick={handleDelete}
          >
            Remove
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4">
          <div>
            <h4 className="font-semibold">Progress:</h4>
            <div className="bg-gray-300 rounded-full h-4 w-full">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Milestones:</h4>
            {project.milestones.length === 0 ? (
              <p className="text-gray-500">No milestones added yet.</p>
            ) : (
              <ul className="list-disc pl-5">
                {project.milestones.map((milestone, index) => (
                  <li key={index} className="text-gray-700">
                    {milestone.name} - {milestone.deadline}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Tasks:</h4>
            {project.tasks.length === 0 ? (
              <p className="text-gray-500">No tasks assigned yet.</p>
            ) : (
              <ul className="list-disc pl-5">
                {project.tasks.map((task, index) => (
                  <li key={index} className="text-gray-700">{task.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Documents:</h4>
            {project.documents.length === 0 ? (
              <p className="text-gray-500">No documents uploaded yet.</p>
            ) : (
              <ul className="list-disc pl-5">
                {project.documents.map((doc, index) => (
                  <li key={index}>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
