import React from "react";
import WelcomeCard from "./WelcomeCard";
import AttendanceChart from "./AttendanceChart";
import TaskCompletionChart from "./TaskCompletionChart";
import ProjectOverview from "./ProjectOverview";

const projectsData = [
  { name: "Project A", status: "Completed" },
  { name: "Project B", status: "In Progress" },
  { name: "Project C", status: "Pending" },
];
const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tasks = ["Approve budget proposal", "Review project milestones"];

const EmployeeDashboard = () => (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>

    {/* Top Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <WelcomeCard name="KS" date={todayDate} tasks={5} projects={3} />
    <ProjectOverview projects={projectsData} />
    </div>

    {/* Middle Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TaskCompletionChart />

      <AttendanceChart />
    </div>
  </div>
);
export default EmployeeDashboard;
