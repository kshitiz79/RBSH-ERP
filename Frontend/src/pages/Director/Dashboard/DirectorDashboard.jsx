import React from "react";
import AttendanceMetrics from "./DComponent/AttendanceMetrics";
import ProjectProgress from "./DComponent/ProjectProgress";
import LeaveRequestsChart from "./DComponent/LeaveRequestsChart";
import EmployeePerformance from "./DComponent/EmployeePerformance";
import FinancialInsights from "./DComponent/FinancialInsights";
import TaskCompletion from "./DComponent/TaskCompletion";
import WelcomeCard from "./DComponent/WelcomeCard";
const DirectorDashboard = () => {
  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tasks = ["Approve budget proposal", "Review project milestones"];

  return (

  <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-bold mb-6">Director Dashboard</h1>
    {/* Top Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="flex flex-col"> 
      <WelcomeCard name="KS" date={todayDate} tasks={tasks} />



        <div className="mt-5">   <ProjectProgress /></div>
      
        </div>
   
      <AttendanceMetrics />


    </div>
   
    {/* Middle Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <EmployeePerformance />
      <FinancialInsights />
    </div>
    {/* Bottom Section */}
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <TaskCompletion />
    </div>
    <div className="mt-4">
    <LeaveRequestsChart />
    </div>
  </div>
 );
};

export default DirectorDashboard;