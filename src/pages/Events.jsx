import React, { useState } from "react";
import Navbar from "../Components/navbar.jsx";
import Footer from "../Components/footer.jsx";
import { Link } from "react-router-dom";
import musicVid from "../assets/music.mp4";
import radioVid from "../assets/radio.mp4";
import funVid from "../assets/fun.mp4";


// Events grouped by category
const musicEvents = [
  { id: 1, title: "Music Concert", img: "/assets/event1.jpg", desc: "Feel the rhythm of live music." },
  { id: 2, title: "Dance Show", img: "/assets/event5.jpg", desc: "Experience spectacular dance performances." },
  { id: 3, title: "Comedy Night", img: "/assets/event6.jpg", desc: "Laugh out loud with top comedians." },
];

const artEvents = [
  { id: 1, title: "Art Exhibition", img: "/assets/event2.jpg", desc: "Explore amazing art pieces." },
  { id: 2, title: "Book Fair", img: "/assets/event7.jpg", desc: "Find your next favorite book." },
  { id: 3, title: "Book Fair", img: "/assets/event7.jpg", desc: "Find your next favorite book." }
];

const wellnessEvents = [
  { id: 1, title: "Tech Meetup", img: "/assets/event3.jpg", desc: "Network with tech enthusiasts." },
  { id: 2, title: "Food Festival", img: "/assets/event4.jpg", desc: "Taste foods from around the world." },
  { id: 3, title: "Yoga Workshop", img: "/assets/event8.jpg", desc: "Relax and rejuvenate your mind." },
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const renderEvents = (events) =>
    events.map((event, index) => (
      <div key={index} className="col-md-6 col-lg-4 mb-4">
        <div className="card bg-transparent border-0 text-white" onClick={() => setSelectedEvent(event)} style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <img src={event.img} className="card-img-top" alt={event.title} style={{ height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
          <div className="card-body text-center">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text">{event.desc}</p>
            <button className="btn" style={{ backgroundColor: '#e473ab', color: 'white', border: 'none', borderRadius: '8px' }} onClick={() => setSelectedEvent(event)}>
              View Details
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div style={{ background: 'linear-gradient(90deg, rgba(56,14,56,1) 24%, rgba(20,10,56,1) 43%, rgba(110,42,61,1) 100%, rgba(36,7,17,1) 96%)', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingTop: '220px' }}>
      <Navbar />

      <div className="container text-center my-5">
        <div className="p-4 mx-auto" style={{ maxWidth: '800px', background: 'rgba(255,255,255,0.05)', boxShadow: '0 0 40px 8px #b347ff', borderRadius: '15px' }}>
          <h1 className="display-4 mb-3">Upcoming Events</h1>
          <p className="lead" style={{ color: '#e0d9f0' }}>Check out the hottest events happening near you. Join, enjoy, and make memories!</p>
        </div>
      </div>

      {/* Music Category */}
      <div className="container">
        <h2 className="d-inline-flex align-items-center gap-3 px-3 py-2 mb-4" style={{ backgroundColor: '#e473ab', color: 'white', fontSize: '1.8rem', fontWeight: '700', borderRadius: '12px', textShadow: '0 0 10px rgba(255,105,180,0.7)', marginLeft: '70px' }}>
          <video src={musicVid} autoPlay loop muted style={{ width: '50px', height: '50px', borderRadius: '8px', background: '#e473ab', mixBlendMode: 'multiply', objectFit: 'contain' }}></video>
          Music Events
        </h2>
        <div className="row justify-content-center px-5">{renderEvents(musicEvents)}</div>
      </div>

      <div className="container">
        <h2 className="d-inline-flex align-items-center gap-3 px-3 py-2 mb-4" style={{ backgroundColor: '#e473ab', color: 'white', fontSize: '1.8rem', fontWeight: '700', borderRadius: '12px', textShadow: '0 0 10px rgba(255,105,180,0.7)', marginLeft: '70px' }}>
          <video src={radioVid} autoPlay loop muted style={{ width: '50px', height: '50px', borderRadius: '8px', background: '#e473ab', mixBlendMode: 'multiply', objectFit: 'contain' }}></video>
          Arts & Culture
        </h2>
        <div className="row justify-content-center px-5">{renderEvents(artEvents)}</div>
      </div>

      <div className="container">
        <h2 className="d-inline-flex align-items-center gap-3 px-3 py-2 mb-4" style={{ backgroundColor: '#e473ab', color: 'white', fontSize: '1.8rem', fontWeight: '700', borderRadius: '12px', textShadow: '0 0 10px rgba(255,105,180,0.7)', marginLeft: '70px' }}>
          <video src={funVid} autoPlay loop muted style={{ width: '50px', height: '50px', borderRadius: '8px', background: '#e473ab', mixBlendMode: 'multiply', objectFit: 'contain' }}></video>
          Tech Events
        </h2>
        <div className="row justify-content-center px-5">{renderEvents(wellnessEvents)}</div>
      </div>

      {selectedEvent && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }} onClick={() => setSelectedEvent(null)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-transparent text-white border-0" style={{ boxShadow: '0 0 40px 10px #b347ff' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title">{selectedEvent.title}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedEvent(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedEvent.img} alt={selectedEvent.title} className="img-fluid mb-3" style={{ height: '300px', objectFit: 'cover', borderRadius: '12px' }} />
                <p>{selectedEvent.desc}</p>
                <Link to="/EventBooking">
                  <button className="btn" style={{ backgroundColor: '#ff69b4', color: 'white', border: 'none', borderRadius: '8px' }}>Book Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
