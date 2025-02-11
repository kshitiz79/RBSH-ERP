import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineDown } from "react-icons/ai";
import { MdOutlineTaskAlt, MdOutlineEventNote } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiCalendar, FiUsers, FiBriefcase } from "react-icons/fi";

/* AccordionSection Component  
   Renders each report section and its nested list of links.
*/
const AccordionSection = ({ section, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <li>
      {/* Section header */}
      <button
        onClick={onToggle}
        className="w-full text-left font-semibold text-sm uppercase mb-1 flex justify-between items-center px-4 py-2 hover:bg-indigo-500 hover:bg-opacity-75 rounded"
      >
        {section.section}
        <AiOutlineDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      {/* Section content */}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <ul className="pl-8 py-2 space-y-1">
          {section.items.map((subItem, idx) => (
            <li key={idx}>
              <NavLink
                to={subItem.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition ${
                    isActive
                      ? "bg-white text-indigo-600 shadow"
                      : "hover:bg-indigo-500 hover:bg-opacity-75"
                  }`
                }
              >
                {subItem.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

/* ReportDropdown Component  
   Renders the “Report” navigation item along with its nested accordion sections.
*/
const ReportDropdown = ({ isActiveReport }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  // Report sections with their nested items
  const reportSubItems = [
    {
      section: "Invoice Management",
      items: [
        { name: "Invoice List", path: "/director-dashboard/report/invoice-list" },
        { name: "Create Invoice", path: "/director-dashboard/report/create-invoice" },
        { name: "Invoice Details", path: "/director-dashboard/report/invoice-details" },
        { name: "Edit Invoice", path: "/director-dashboard/report/edit-invoice" },
      ],
    },
    {
      section: "Client Management",
      items: [
        { name: "Client List", path: "/director-dashboard/report/client-list" },
        { name: "Client Details", path: "/director-dashboard/report/client-details" },
        { name: "Add/Edit Client", path: "/director-dashboard/report/add-edit-client" },
      ],
    },
    {
      section: "Payment Management",
      items: [
        { name: "Payment List", path: "/director-dashboard/report/payment-list" },
        { name: "Payment Details", path: "/director-dashboard/report/payment-details" },
        { name: "Payment Reminder", path: "/director-dashboard/report/payment-reminder" },
      ],
    },
    {
      section: "Expense Management",
      items: [
        { name: "Expense List", path: "/director-dashboard/report/expense-list" },
        { name: "Add/Edit Expense", path: "/director-dashboard/report/add-edit-expense" },
      ],
    },
    {
      section: "Reports & Analytics",
      items: [
        { name: "Revenue & Expense Reports", path: "/director-dashboard/report/revenue-expense-reports" },
        { name: "Profit & Loss Report", path: "/director-dashboard/report/profit-loss" },
        { name: "Tax Reports", path: "/director-dashboard/report/tax-reports" },
        { name: "Custom Date Range", path: "/director-dashboard/report/custom-date-range" },
      ],
    },
  ];

  return (
    <div>
      {/* Report header */}
      <button
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
          setOpenSection(null); // close any open section when toggling Report
        }}
        className={`flex items-center gap-4 w-full px-4 py-3 rounded-lg transition ${
          isActiveReport ? "bg-white text-indigo-600 shadow-lg" : "hover:bg-indigo-500 hover:bg-opacity-75"
        }`}
      >
        <span className="text-lg">
          <HiOutlineDocumentReport />
        </span>
        <span className="font-medium">Report</span>
        <span className="ml-auto">
          <AiOutlineDown
            className={`transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </span>
      </button>
      {/* Nested accordion items */}
      {dropdownOpen && (
        <ul className="pl-8 py-2 space-y-4">
          {reportSubItems.map((section, index) => (
            <AccordionSection
              key={index}
              section={section}
              isOpen={openSection === index}
              onToggle={() =>
                setOpenSection(openSection === index ? null : index)
              }
            />
          ))}
        </ul>
      )}
    </div>
  );
};

/* DirectorDashboardLayout Component  
   The global layout for the director dashboard, including a scrollable sidebar with integrated navigation items.
*/
const DirectorDashboardLayout = () => {
  const location = useLocation();

  // Global navigation items.
  // Note: "Report" is integrated here (using isDropdown: true) and is placed after "Tasks".
  const navItems = [
    { name: "Dashboard", path: "/director-dashboard", icon: <AiOutlineDashboard /> },
    { name: "Attendance", path: "/director-dashboard/attendance", icon: <FiCalendar /> },
    { name: "Employee", path: "/director-dashboard/employee", icon: <FiUsers /> },
    { name: "Project", path: "/director-dashboard/project", icon: <FiBriefcase /> },
    { name: "Tasks", path: "/director-dashboard/task", icon: <MdOutlineTaskAlt /> },
    { name: "Report", isDropdown: true }, // Report will use a dropdown with nested accordions
    { name: "Leave", path: "/director-dashboard/leave", icon: <FiCalendar /> },
    { name: "Event", path: "/director-dashboard/event", icon: <MdOutlineEventNote /> },
    { name: "Profile", path: "/director-dashboard/profile", icon: <AiOutlineUser /> },
    { name: "Setting", path: "/director-dashboard/setting", icon: <IoSettingsOutline /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Global scrollable sidebar */}
      <aside className="w-72 bg-gradient-to-b from-indigo-600 to-blue-500 text-white p-5 fixed h-full shadow-lg overflow-y-auto">
        <h2 className="text-center text-2xl font-bold mb-8">Director Dashboard</h2>
        <nav>
          <ul className="space-y-3">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.isDropdown ? (
                  <ReportDropdown isActiveReport={location.pathname.includes("/director-dashboard/report")} />
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 ml-72 p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DirectorDashboardLayout;
