import React from "react";

const Reminders = ({ events }) => {
  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No events scheduled.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {events.map((event) => (
            <li key={event.id} className="py-4">
              <h3 className="text-lg font-bold">{event.title}</h3>
              <p className="text-gray-700">{event.description}</p>
              <p>
                <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
              </p>
              <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                Send Reminder
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reminders;
