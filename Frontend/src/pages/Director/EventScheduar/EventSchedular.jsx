import React, { useState } from "react";
import EventForm from "./ESComponent/EventForm";
import Reminders from "./ESComponent/Reminders";
import CalendarUI from "./ESComponent/CalendarUI";

const EventScheduler = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddEvent = (event) => {
    const newEvent = {
      ...event,
      id: events.length + 1,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Event Scheduler</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      {/* Calendar Section */}
      <CalendarUI events={events} />

      {/* Reminders Section */}
      <div className="mt-6">
        <Reminders events={events} />
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <EventForm
          onAddEvent={handleAddEvent}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default EventScheduler;