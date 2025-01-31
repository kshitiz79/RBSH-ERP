import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CustomCalendar.css";

const localizer = momentLocalizer(moment);

const CalendarUI = ({ events }) => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-bold mb-4">Company Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]} // Removed agenda view
        style={{ height: "500px" }}
        popup
      />
    </div>
  );
};

export default CalendarUI;
