import { useState, useEffect } from "react";
import EventForm from "./EventForm";
import EventList from "./EventList";
import AdminLogin from "./AdminLogin";
import "./EventDashboard.css";

const API_URL = "http://localhost:5000/api/events";

export default function EventDashboard() {
  // ==============================
  // AUTH STATE
  // ==============================
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // ==============================
  // EVENT STATES
  // ==============================
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  // ==============================
  // CHECK LOGIN ON LOAD
  // ==============================
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // ==============================
  // LOAD EVENTS
  // ==============================
  useEffect(() => {
    if (!isAdminLoggedIn) return;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.map((e) => ({
          id: e.id,
          title: e.title,
          description: e.description,
          eventDate: e.event_date,
          startTime: e.start_time,
          endTime: e.end_time,
          location: e.location,
          ticketPrice: Number(e.ticket_price),
          totalSlots: e.total_slots,
          availableSlots: e.available_slots,
          flyer: e.flyer,
        }));

        setEvents(formattedEvents);
      })
      .catch((err) => console.error("Error loading events:", err));
  }, [isAdminLoggedIn]);

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsAdminLoggedIn(false);
  };

  // ==============================
  // ADD EVENT
  // ==============================
  const handleAddEvent = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        event_date: formData.eventDate,
        start_time: formData.startTime,
        end_time: formData.endTime,
        location: formData.location,
        ticket_price: formData.ticketPrice,
        total_slots: formData.totalSlots,
        available_slots: formData.availableSlots || formData.totalSlots,
        flyer: formData.flyer || null,
      };

      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add event");

      const e = await res.json();

      const newEvent = {
        id: e.id,
        title: e.title,
        description: e.description,
        eventDate: e.event_date,
        startTime: e.start_time,
        endTime: e.end_time,
        location: e.location,
        ticketPrice: Number(e.ticket_price),
        totalSlots: e.total_slots,
        availableSlots: e.available_slots,
        flyer: e.flyer,
      };

      setEvents((prev) => [newEvent, ...prev]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to create event");
    }
  };

  // ==============================
  // UPDATE EVENT
  // ==============================
  const handleUpdateEvent = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        event_date: formData.eventDate,
        start_time: formData.startTime,
        end_time: formData.endTime,
        location: formData.location,
        ticket_price: formData.ticketPrice,
        total_slots: formData.totalSlots,
        available_slots: formData.availableSlots || formData.totalSlots,
        flyer: formData.flyer || null,
      };

      const res = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update event");

      const e = await res.json();

      const updatedEvent = {
        id: e.id,
        title: e.title,
        description: e.description,
        eventDate: e.event_date,
        startTime: e.start_time,
        endTime: e.end_time,
        location: e.location,
        ticketPrice: Number(e.ticket_price),
        totalSlots: e.total_slots,
        availableSlots: e.available_slots,
        flyer: e.flyer,
      };

      setEvents((prev) =>
        prev.map((ev) => (ev.id === editingId ? updatedEvent : ev))
      );

      setEditingId(null);
      setEditingEvent(null);
      setShowForm(false);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update event");
    }
  };

  // ==============================
  // DELETE EVENT
  // ==============================
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete event");
    }
  };

  // ==============================
  // EDIT EVENT
  // ==============================
  const handleEdit = (event) => {
    setEditingId(event.id);
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setEditingEvent(null);
  };

  // ==============================
  // SEARCH FILTER
  // ==============================
  const filteredEvents = events.filter(
    (event) =>
      (event.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.location || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // ==============================
  // LOGIN GUARD
  // ==============================
  if (!isAdminLoggedIn) {
    return (
      <AdminLogin onLoginSuccess={() => setIsAdminLoggedIn(true)} />
    );
  }

  // ==============================
  // DASHBOARD UI
  // ==============================
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Event Admin Dashboard</h1>
            <p>Manage, create, and track your events</p>
          </div>

          <div className="header-actions">
            <button
              className="btn-add-event"
              onClick={() => setShowForm(true)}
            >
              + Create Event
            </button>

            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {showForm && (
          <div className="form-sidebar">
            <EventForm
              event={editingEvent}
              onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        <main className="main-content">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="event-count">
              {filteredEvents.length} events
            </span>
          </div>

          {filteredEvents.length > 0 ? (
            <EventList
              events={filteredEvents}
              onEdit={handleEdit}
              onDelete={handleDeleteEvent}
            />
          ) : (
            <div className="empty-state">
              <p>No events found. Create your first event!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
