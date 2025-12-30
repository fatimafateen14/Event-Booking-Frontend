import { useState } from "react"
import "../styles/booking-modal.css"

const BookingModal = ({ event, user, onClose, onConfirm }) => {
  console.log("BookingModal props:", { user, event })
  const [quantity, setQuantity] = useState(1)

  const totalPrice = quantity * event.ticket_price

  const handleQuantityChange = (e) => {
    const value = Math.min(Math.max(Number.parseInt(e.target.value) || 1, 1), 10)
    setQuantity(value)
  }

  const handleConfirm = () => {
  onConfirm({
    user_id: user.id,        // integer
    event_id: event.id,      // string UUID
    quantity
  })
}

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Booking</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Event Details */}
          <div className="booking-section">
            <h3 className="section-heading">Event Details</h3>
            <div className="event-details">
              <p>
                <strong>Event:</strong> {event.title}
              </p>
              <p>
                <strong>Date:</strong> {event.event_date}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Price per Ticket:</strong> Rs{event.ticket_price}
              </p>
            </div>
          </div>

          {/* User Details */}
          <div className="booking-section">
            <h3 className="section-heading">Attendee Details</h3>
            <div className="user-details">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="booking-section">
            <h3 className="section-heading">Number of Tickets</h3>
            <div className="quantity-selector">
              <label htmlFor="quantity" className="quantity-label">
                Quantity:
              </label>
              <div className="quantity-controls">
                <button className="qty-btn" onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="qty-input"
                />
                <button className="qty-btn" onClick={() => setQuantity(Math.min(quantity + 1, 10))}>
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="price-breakdown">
            <div className="breakdown-row">
              <span>Ticket Price:</span>
              <span>
                Rs{event.ticket_price} × {quantity}
              </span>
            </div>
            <div className="breakdown-total">
              <span>Total:</span>
              <span>Rs{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-confirm" onClick={handleConfirm}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
