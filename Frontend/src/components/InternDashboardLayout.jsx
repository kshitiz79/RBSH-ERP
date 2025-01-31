import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { FiBookOpen, FiBriefcase, FiCalendar } from "react-icons/fi";
import { MdTask, MdOutlineEventNote, MdOutlineHelp } from "react-icons/md";
import { BsBarChart, BsBell,  BsCalendar2DateFill } from "react-icons/bs";

const InternDashboardLayout = () => {
  const location = useLocation();

  // Navigation items with icons
  const navItems = [
    { name: "Dashboard", path: "/intern-dashboard", icon: <AiOutlineDashboard /> },
    { name: "Profile", path: "/intern-dashboard/profile", icon: <AiOutlineUser /> },
    { name: "Project", path: "/intern-dashboard/project", icon: <FiBriefcase /> },
    { name: "Attendance", path: "/intern-dashboard/attendance", icon: <FiCalendar /> },
    { name: "Tasks", path: "/intern-dashboard/task", icon: <MdTask /> },
    { name: "Performance", path: "/intern-dashboard/performance", icon: <BsBarChart /> },
    { name: "Leave", path: "/intern-dashboard/leave", icon: <BsCalendar2DateFill /> }, // Fixed typo in path
    { name: "Event", path: "/intern-dashboard/event", icon: <MdOutlineEventNote /> },
    { name: "Notifications", path: "/intern-dashboard/notifications", icon: <BsBell /> },
    { name: "Resources", path: "/intern-dashboard/resources", icon: <FiBookOpen /> }, // Added Resources
    { name: "Help Desk", path: "/intern-dashboard/help-desk", icon: <MdOutlineHelp /> },
  ];
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-indigo-600 to-blue-500 text-white p-5 fixed h-full shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-8">
          Intern Dashboard
        </h2>
        <nav>
          <ul className="space-y-3">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                      isActive && location.pathname === item.path
                        ? "bg-white text-indigo-600 shadow-lg"
                        : "hover:bg-indigo-500 hover:bg-opacity-75"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8 bg-gray-100 overflow-y-auto">
        <Outlet /> {/* Render child routes */}
      </main>
    </div>
  );
};

export default InternDashboardLayout