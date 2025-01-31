import React, { useState } from "react";
import ProjectForm from "./PMComponent/ProjextForm";
import ProjectList from "./PMComponent/ProjectList";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);

  const handleAddProject = (project) => {
    setProjects([
      ...projects,
      { ...project, id: projects.length + 1, progress: 0, milestones: [], tasks: [], documents: [] },
    ]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Project Management</h1>
      <ProjectForm onAddProject={handleAddProject} />
      <ProjectList projects={projects} setProjects={setProjects} />
    </div>
  );
};

export default ProjectManagement;
