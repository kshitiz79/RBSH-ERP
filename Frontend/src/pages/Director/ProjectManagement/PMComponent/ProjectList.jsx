import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects, setProjects }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Current Projects</h2>
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects available. Start by adding one!</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              setProjects={setProjects}
              projects={projects}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
