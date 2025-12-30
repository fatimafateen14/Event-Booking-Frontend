import { useState } from "react"
import "../styles/event-card1.css"

const EventCard = ({ event, onBookTicket }) => {
  const [showPopup, setShowPopup] = useState(false)

  const handleBookClick = () => {
  const token = localStorage.getItem("token")
  const storedUser = localStorage.getItem("user")

  if (!token || !storedUser) {
    setShowPopup(true)
    return
  }

  const parsedUser = JSON.parse(storedUser) // ✅ parse here
  onBookTicket(event, parsedUser)           // pass user along
}

  const handleRedirect = (path) => {
    localStorage.setItem("redirectAfterLogin", "/EventBooking")
    window.location.href = path
  }

  return (
    <>
      <div className="event-card">
        <div className="event-image-wrapper">
          <img 
          src={event.flyer
      ? `http://localhost:5000/public/images/events/${event.flyer}`
      : "http://localhost:5000/public/images/events/default.jpg"}
            alt={event.title}
            className="event-image"
          />
          <div className="available-badge">
            {event.available_slots} Available
          </div>
        </div>

        <div className="event-content">
          <h3 className="event-title">{event.title}</h3>

          <p className="event-description">{event.description}</p>

          <div className="event-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span className="meta-text">{event.event_date}</span>
            </div>

            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span className="meta-text">{event.location}</span>
            </div>
          </div>

          <div className="event-footer">
            <div className="price-section">
              <span className="price-label">Price</span>
              <span className="price-value">Rs{event.ticket_price}</span>
            </div>

            <button className="btn btn-book" onClick={handleBookClick}>
              Book Ticket
            </button>
          </div>
        </div>
      </div>

      {/* LOGIN POPUP */}
      {showPopup && (
        <div className="overlay">
          <div className="popup-card">
            <p>To book this event, please login or sign up first.</p>
            <div className="popup-buttons">
              <button onClick={() => handleRedirect("/login")}>Login</button>
              <button onClick={() => handleRedirect("/signup")}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EventCard