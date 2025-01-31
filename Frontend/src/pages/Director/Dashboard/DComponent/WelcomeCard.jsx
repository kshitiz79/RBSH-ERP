import React from "react";

const WelcomeCard = ({ name, date, tasks }) => {
  return (
    <div className="bg-blue-500 text-white rounded-lg shadow p-6 flex justify-between items-center">
      {/* Left Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-500 text-lg">📈</span>
          </div>
          <h2 className="text-2xl font-normal">
            Welcome Back <span className="font-extrabold">{name}</span>
          </h2>
        </div>
        <p className="text-sm mb-4">{date}</p>
        <div>
          <h3 className="text-lg font-semibold mb-2">Your Tasks</h3>
          <ul className="space-y-1">
            {tasks.slice(0, 2).map((task, index) => (
              <li key={index} className="text-sm">
                <span className="mr-2">•</span>
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Section */}
     
    </div>
  );
};

export default WelcomeCard;

