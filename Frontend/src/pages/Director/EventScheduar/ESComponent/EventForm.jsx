import React, { useState } from "react";

const EventForm = ({ onAddEvent, onClose }) => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!event.title || !event.startDate || !event.endDate) {
      alert("Please fill in all required fields.");
      return;
    }
    onAddEvent(event);
    setEvent({ title: "", description: "", startDate: "", endDate: "" });
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Add Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Add Title"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Add Description"
            className="w-full p-2 border rounded resize-none"
            rows="3"
          />
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={event.startDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                name="endDate"
                value={event.endDate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
