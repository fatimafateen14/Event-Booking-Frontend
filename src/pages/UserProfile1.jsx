import { useState, useEffect } from "react"
import "../styles/user-profile.css"

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  // Sync user data
  useEffect(() => {
    setFormData(user)
  }, [user])

  // Fetch user bookings
  useEffect(() => {
    if (!user?.id) return

    fetch(`http://localhost:5000/api/bookings/user/${user.user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load bookings", err)
        setLoading(false)
      })
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        { method: "DELETE" }
      )

      if (!res.ok) throw new Error("Cancel failed")

      setBookings((prev) => prev.filter((b) => b.id !== bookingId))
    } catch (err) {
      alert("Failed to cancel booking")
    }
  }

  return (
    <div className="user-profile-card">
      <div className="profile-avatar">
        <div className="avatar-placeholder">
          {user.name?.split(" ").map((n) => n[0]).join("")}
        </div>
      </div>

      <div className="profile-content">
        <h3 className="profile-title">Profile</h3>

        {isEditing ? (
          <div className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>

            <button onClick={() => setIsEditing(false)}>Save</button>
          </div>
        ) : (
          <div className="profile-info">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
          </div>
        )}

        {/* BOOKINGS SECTION */}
        <div className="bookings-summary">
          <h4>Your Bookings</h4>

          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="no-bookings">No active bookings</p>
          ) : (
            <ul className="booking-list">
              {bookings.map((booking) => (
                <li key={booking.id} className="booking-item">
                  <div>
                    <strong>{booking.event_title}</strong>
                    <p>{booking.event_date}</p>
                    <p>Tickets: {booking.ticket_count}</p>
                  </div>

                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
