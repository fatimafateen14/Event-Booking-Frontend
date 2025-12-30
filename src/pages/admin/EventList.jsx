import EventCard from "./EventCard"
import "./EventList.css"

export default function EventList({ events, onEdit, onDelete }) {
  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
