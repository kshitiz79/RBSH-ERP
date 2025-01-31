import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import DirectorDashboardLayout from "../components/DirectorDashboardLayout";
import DirectorDashboard from "../pages/Director/Dashboard/DirectorDashboard";
import LeaveManagement from "./../pages/Director/Leave/LeaveManagement";
import AttandanceManagement from "./../pages/Director/Attandance/AttandanceManagement";
import ProfileManagement from "../pages/Director/Profile/ProfileManagement";
import TaskManagement from "./../pages/Director/TaskManagement/TaskManagement";
import ProjectManagement from "./../pages/Director/ProjectManagement/ProjectManagement";
import EmployeeManagement from "./../pages/Director/EmployementManagement/EmployeeManagement";
import EventScheduler from "../pages/Director/EventScheduar/EventSchedular";
import EmployeDashboardLayout from "../components/EmployeDashboardLayout";
import EmployeeDashboard from "../pages/Employee/Dashboard/EmDashboard";
import Performance from "../pages/Employee/Performance/Performance";
import InternDashboardLayout from "../components/InternDashboardLayout";
import InternProfile from "../pages/Intern/Profile/InternProfile";
import InternDashboard from "../pages/Intern/Dashboard/InternDashboard";
import Auth from "../pages/Auth/Auth";
import ProtectedRoute from "./ProtectedRoute";
import Attendance from "../pages/Intern/Attandance/Attandance";
import Event from "../pages/Employee/Event/Event";
import EmAttandance from "../pages/Employee/Attandance/EmAttandance";
import EMLeave from "../pages/Employee/Leave/EMLeave";
import EmProfile from "../pages/Employee/Profile/EmProfile";
import EMProject from "../pages/Employee/Project/EMProject";
import EMTask from "../pages/Employee/Tasks/EMTask";
import Notification from "../pages/Employee/Notification/Notification";
import Help from "../pages/Employee/Help/Help";
import InternTask from "../pages/Intern/Task/InternTask";
import InternResource from "../pages/Intern/Resources/InternResource";
import InternProject from "../pages/Intern/Project/InternProject";
import InternPerformance from "../pages/Intern/Performance/InternPerformance";
import InternLeave from "../pages/Intern/Leave/InternLeave";
import InternEventCalander from "../pages/Intern/EventCalander/InternEventCalander";
import InternNotification from "../pages/Intern/Notification/InternNotification";
import InternHelp from "../pages/Intern/Help/InternHelp";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {

    path: "/director-dashboard",
    element: (
      <ProtectedRoute role="director">
        <DirectorDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "", // Default dashboard route
        element: <DirectorDashboard />,
      },
      {
        path: "leave",
        element: <LeaveManagement />,
      },
      {
        path: "attendance", // Corrected path for Attendance Management
        element: <AttandanceManagement />,
      },
      {
        path: "project",
        element: <ProjectManagement />,
      },
      {
        path: "task",
        element: <TaskManagement />,
      },
      {
        path: "profile",
        element: <ProfileManagement />,
      },
      {
        path: "event",
        element: <EventScheduler />,
      },
      {
        path: "employee",
        element: <EmployeeManagement />,
      },
      {
        path: "*",
        element: <h1>Error 404</h1>,
      },
    ],
  },

{
  path: "/employee-dashboard",
  element: (
    <ProtectedRoute role="employee">
      <EmployeDashboardLayout />
    </ProtectedRoute>
  ),
  children: [

    {
      path: "",
      element: <EmployeeDashboard />,
    },

    {
      path: "performance",
      element: <Performance />,
    },

    {
      path: "event",
      element: <Event/>,
    },

    {
      path: "attendance",
      element: <EmAttandance/>,
    },

    {
      path: "event",
      element: <Event/>,
    },

    {
      path: "leave",
      element: <EMLeave/>,
    }, {
      path: "profile",
      element: <EmProfile/>,
    },

    {
      path: "project",
      element: <EMProject/>,
    },

    {
      path: "task",
      element: <EMTask/>,
    },

    {
      path: "notifications",
      element: <Notification/>,
    },
    {
      path: "help-desk",
      element: <Help/>,
    },
  ]

},





{
  path: "/intern-dashboard",
  element: (
    <ProtectedRoute role="intern">
      <InternDashboardLayout />
    </ProtectedRoute>
  ),
  children: [

    {
      path: "",
      element: <InternDashboard />,
    },

    {
      path: "profile",
      element: <InternProfile/>,
    },
    {
      path: "attendance",
      element: <Attendance/>,
    },

    {
      path: "event",
      element: <InternEventCalander/>,
    }, {
      path: "leave",
      element: <InternLeave/>,
    }, {
      path: "performance",
      element: <InternPerformance/>,
    }, {
      path: "project",
      element: <InternProject/>,
    }, {
      path: "resources",
      element: <InternResource/>,
    }, {
      path: "task",
      element: <InternTask/>,
    },
    {
      path: "notifications",
      element: <InternNotification/>,
    },
    
    {
      path: "help-desk",
      element: <InternHelp/>,
    },

  ]
},






]);

export default router;
