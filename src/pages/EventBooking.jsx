import { useState, useEffect } from "react"
import UserProfile from "./UserProfile1"
import EventCard from "./EventCard1"
import BookingModal from "./BookingModal"
import "../styles/event-booking.css"

const EventBooking = () => {

  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [user, setUser] = useState({ name: "", email: "" })
  const [events, setEvents] = useState([])
  

  useEffect(() => {
  // 1️⃣ Try to get user from localStorage (after login)
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    const userObj = JSON.parse(storedUser)
    setUser({
      id: userObj.id,
      name: userObj.name || userObj.fullName, // depends on how you stored it
      email: userObj.email
    })
  } else {
    // 2️⃣ fallback: fetch from backend if cookies/JWT exist
    fetch("http://localhost:5000/api/users/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser({
            id: data.user.id,
            name: data.user.fullName,
            email: data.user.email,
          })
        }
      })
      .catch(err => console.error("Failed to fetch user:", err))
  }
}, [])


  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/events") // your API endpoint to get all events
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events:", err))
  }, [])

  const handleBookTicket = (event) => {
  if (!user?.id) {
    alert("User not loaded yet. Please log in first.");
    return;
  }
  setSelectedEvent(event);
  setShowBookingModal(true);
};


  const handleCloseModal = () => setSelectedEvent(null)

  const handleConfirmBooking = async () => {
  console.log("USER:", user);
  console.log("EVENT:", selectedEvent);

  if (!user?.id || !selectedEvent?.id) {
    alert("Missing user or event data");
    return;
  }

  const bookingData = {
    user_id: user.id,
    event_id: selectedEvent.id,
    quantity: 1,
  };

  try {
    const res = await fetch("http://localhost:5000/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Booking failed:", data);
      alert(data.message || "Booking failed");
      return;
    }

    alert("Booking successful!");
    setShowBookingModal(false);
    setSelectedEvent(null);
  } catch (err) {
    console.error("Server error:", err);
    alert("Server error");
  }
};


  return (
    <div className="event-booking-container">
      {/* Header */}
      <header className="event-header">
        <div className="header-content">
          <h1>EventAI</h1>
          <p>Discover and book amazing events with EventAI</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className="container-fluid">
          <div className="row g-4">
            {/* User Profile Sidebar */}
            <div className="col-lg-3">
              <UserProfile user={user} />
            </div>

            {/* Events Grid */}
            <div className="col-lg-9">
              <div className="events-section">
                <h2 className="section-title">UPCOMING EVENTS</h2>
                <div className="events-grid">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onBookTicket={handleBookTicket}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedEvent && showBookingModal && (
  <BookingModal
    event={selectedEvent}
    user={user}
    onClose={() => setShowBookingModal(false)}
    onConfirm={handleConfirmBooking}
  />
)}


    </div>
  )
}

export default EventBooking
