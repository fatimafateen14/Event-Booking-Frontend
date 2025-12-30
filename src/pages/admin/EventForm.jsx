import { useState, useEffect } from "react";
import "./EventForm.css";

export default function EventForm({ event, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    start_time: "",
    end_time: "",
    location: "",
    ticket_price: 0,
    total_slots: 0,
    available_slots: 0,
    flyer: "", // base64 optional
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        event_date: event.event_date,
        start_time: event.start_time,
        end_time: event.end_time,
        location: event.location,
        ticket_price: event.ticket_price,
        total_slots: event.total_slots,
        available_slots: event.available_slots,
        flyer: event.flyer || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "ticketPrice"
          ? parseFloat(value) || 0
          : name === "totalSlots" || name === "availableSlots"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, flyer: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="form-header">
        <h2>{event ? "Edit Event" : "Create New Event"}</h2>
      </div>

      <div className="form-group">
        <label>Event Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter event title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter event description"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Event Date *</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Time *</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>End Time *</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter location"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Ticket Price (Rs) *</label>
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label>Total Slots *</label>
          <input
            type="number"
            name="totalSlots"
            value={formData.totalSlots}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Available Slots *</label>
        <input
          type="number"
          name="availableSlots"
          value={formData.availableSlots}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
  <label>Event Flyer</label>
  <select
    name="flyer"
    value={formData.flyer}
    onChange={handleChange}
  >
    <option value="">Select flyer</option>
    <option value="event1.png">Event 1</option>
    <option value="event2.png">Event 2</option>
    <option value="event3.png">Event 3</option>
    <option value="event4.png">Event 4</option>
    <option value="event5.png">Event 5</option>
    <option value="event6.png">Event 6</option>
    <option value="default.png">Default</option>
  </select>
</div>


      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {event ? "Update Event" : "Create Event"}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
}
