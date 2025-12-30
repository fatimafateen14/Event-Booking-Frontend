import "./EventCard.css"

export default function EventCard({ event, onEdit, onDelete }) {
  const occupancyPercentage =
    event?.totalSlots && event?.availableSlots
      ? ((event.totalSlots - event.availableSlots) / event.totalSlots) * 100
      : 0;

  return (
    <div className="event-card">
      {event?.flyer && (
        <div className="card-image">
          <img  src={event.flyer
      ? `http://localhost:5000/public/images/events/${event.flyer}`
      : "http://localhost:5000/public/images/events/default.jpg"} alt={event.title || "Event"} />
        </div>
      )}

      <div className="card-content">
        <h3 className="card-title">{event?.title || "Untitled Event"}</h3>

        {event?.description && <p className="card-description">{event.description}</p>}

        <div className="card-details">
          <div className="detail-item">
            <span className="detail-label">Date</span>
            <span className="detail-value">
              {event?.eventDate ? new Date(event.eventDate).toLocaleDateString() : "N/A"}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Time</span>
            <span className="detail-value">
              {event?.startTime || "N/A"} - {event?.endTime || "N/A"}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Location</span>
            <span className="detail-value">{event?.location || "N/A"}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Price</span>
            <span className="detail-value">
              Rs{event?.ticketPrice !== undefined ? event.ticketPrice.toFixed(2) : "N/A"}
            </span>
          </div>
        </div>

        <div className="slot-section">
          <div className="slot-header">
            <span className="slot-label">Slot Occupancy</span>
            <span className="slot-count">
              {event?.totalSlots && event?.availableSlots
                ? `${event.totalSlots - event.availableSlots}/${event.totalSlots}`
                : "0/0"}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${occupancyPercentage}%` }} />
          </div>
          <span className="slot-available">{event?.availableSlots ?? 0} available</span>
        </div>

        <div className="card-actions">
          <button className="btn-edit1" onClick={() => onEdit(event)}>
            Edit
          </button>
          <button className="btn-delete" onClick={() => onDelete(event?.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
