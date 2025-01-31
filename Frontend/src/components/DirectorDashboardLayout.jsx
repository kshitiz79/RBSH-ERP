import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { MdOutlineTaskAlt, MdOutlineEventNote } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiCalendar, FiUsers, FiBriefcase } from "react-icons/fi";

const DirectorDashboardLayout = () => {
  const location = useLocation();

  // Navigation items with icons
  const navItems = [
    { name: "Dashboard", path: "/director-dashboard", icon: <AiOutlineDashboard /> },
    { name: "Attendance", path: "/director-dashboard/attendance", icon: <FiCalendar /> },
    { name: "Employee", path: "/director-dashboard/employee", icon: <FiUsers /> },
    { name: "Project", path: "/director-dashboard/project", icon: <FiBriefcase /> },
    { name: "Tasks", path: "/director-dashboard/task", icon: <MdOutlineTaskAlt /> },
    { name: "Leave", path: "/director-dashboard/leave", icon: <FiCalendar /> },
    { name: "Event", path: "/director-dashboard/event", icon: <MdOutlineEventNote /> },
    { name: "Report", path: "/director-dashboard/report", icon: <HiOutlineDocumentReport /> },
    { name: "Profile", path: "/director-dashboard/profile", icon: <AiOutlineUser /> },
    { name: "Setting", path: "/director-dashboard/setting", icon: <IoSettingsOutline /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-indigo-600 to-blue-500 text-white p-5 fixed h-full shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-8">
          Director Dashboard
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

export default DirectorDashboardLayout;
