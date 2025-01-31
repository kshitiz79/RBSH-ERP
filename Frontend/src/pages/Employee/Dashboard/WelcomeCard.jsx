import React from "react";

const WelcomeCard = ({ name, date, tasks,projects }) => {
  return (
    <div className="bg-blue-500 text-white rounded-lg shadow p-6 flex justify-between items-center">
      {/* Left Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="text-blue-500 text-lg">👋</span>
          </div>
          <h2 className="text-2xl font-normal">
            Welcome Back <span className="font-extrabold">{name}</span>
          </h2>
        </div>
        <p className="text-sm mb-4">{date}</p>
        <div>
          <h3 className="text-lg font-semibold mb-2">Tasks & Projects</h3>
          <div className="space-y-2">
          <p>Assigned Tasks: {tasks}</p>
          <p>Ongoing Projects: {projects}</p>
        </div>
        </div>
      </div>

      {/* Right Section */}
     
    </div>
  );
};

export default WelcomeCard;

