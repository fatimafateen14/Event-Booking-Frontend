import "./Home.css";
import bgVideo from "../assets/bg.mp4";
import logo from "../assets/logo.png";
import about from "../assets/about.png";
import { Link } from "react-router-dom";
import Footer from "../Components/footer.jsx";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [events, setEvents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  // Check login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // Fetch events from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  // Carousel auto-scroll
  useEffect(() => {
    if (carouselPaused || events.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselPaused, events]);

  return (
    <div className="home-container">
      {/* Top Left Logo */}
      <div className="top-left">
        <img src={logo} className="logo" alt="EventAI" />
        <div className="text-box">
          <h1>EventAI</h1>
          <p>Your Event Partner</p>
        </div>
      </div>

      {/* Top Right Buttons */}
      <div className="top-right">
        <Link to="/login">
          <button className="btn login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn signup-btn">Sign Up</button>
        </Link>
      </div>

      {/* Hero Video */}
      <div className="hero-video-wrapper">
        <video className="hero-video" autoPlay loop muted>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Center Navigation Pills */}
      <div className="center-pill">
        <ul className="pill-items">
          <li className="pill-item"><Link to="/">Home</Link></li>
          <li className="pill-item"><Link to="/EventBooking">Book Events</Link></li>
          <li className="pill-item"><Link to="/profile">Profile</Link></li>
          <li className="pill-item">
            <button
              className="nav-button"
              onClick={() => {
                const section = document.getElementById("about-us");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", font: "inherit", padding: 0 }}
            >
              About Us
            </button>
          </li>
           </ul>
      </div>

      {/* Hero Text */}
      <div className="hero-text">
        <h1>Don’t miss out!</h1>
        <h3>
          Explore and book the <span className="highlight">vibrant events</span> happening near you.
        </h3>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="Search Events..." />
        <button className="search-btn">Search</button>
      </div>

      {/* Upcoming Events Carousel */}
      <section className="upcoming-events-section page-background">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="section-desc">Check out the latest events happening near you and book your spot now!</p>

        <div className="carousel-card-wrapper">
          {events.map((event, idx) => {
            let className = "carousel-card-single";
            if (idx === activeIndex) className += " active";
            else if (idx === (activeIndex - 1 + events.length) % events.length) className += " prev";
            else if (idx === (activeIndex + 1) % events.length) className += " next";

            return (
              <div key={event.id} className={className}>
                <div className="card-inner">
                  <img
                    src={event.flyer
                      ? `http://localhost:5000/public/images/events/${event.flyer}`
                      : "http://localhost:5000/public/images/events/default.jpg"}
                    alt={event.title}
                    className="card-image"
                  />
                  <h3>{event.title}</h3>
                  <button className="view-btn" onClick={() => setActiveEvent(event)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {events.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            ></span>
          ))}
        </div>

        {/* Modal */}
        {activeEvent && (
          <div className="modal-overlay" onClick={() => setActiveEvent(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
             <h3>{activeEvent.title}</h3>
              <p>{activeEvent.description}</p>
              <p> <label>Date: </label>{activeEvent.event_date}</p>
              <p><label>Location:  </label>{activeEvent.location}</p>
              <p><label>Price  </label>{activeEvent.ticket_price}</p>
              <button className="close-btn" onClick={() => setActiveEvent(null)}>✕</button>
            </div>
          </div>
        )}
      </section>

      {/* Recommended Events Section */}
<section className="upcoming-events-section">
  <h2 className="section-title">Recommended Events for you</h2>
<p className="section-desc">Check out events we recommend for you and book your spot now!</p>

<div className="carousel-card-wrapper">
          {events.map((event, idx) => {
            let className = "carousel-card-single";
            if (idx === activeIndex) className += " active";
            else if (idx === (activeIndex - 1 + events.length) % events.length) className += " prev";
            else if (idx === (activeIndex + 1) % events.length) className += " next";

            return (
              <div key={event.id} className={className}>
                <div className="card-inner">
                  <img
                    src={event.flyer
                      ? `http://localhost:5000/public/images/events/${event.flyer}`
                      : "http://localhost:5000/public/images/events/default.jpg"}
                    alt={event.title}
                    className="card-image"
                  />
                  <h3>{event.title}</h3>
                  <button className="view-btn" onClick={() => setActiveEvent(event)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {events.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            ></span>
          ))}
        </div>

        {/* Modal */}
        {activeEvent && (
          <div className="modal-overlay" onClick={() => setActiveEvent(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
             <h3>{activeEvent.title}</h3>
              <p>{activeEvent.description}</p>
              <p> <label>Date: </label>{activeEvent.event_date}</p>
              <p><label>Location:  </label>{activeEvent.location}</p>
              <p><label>Price  </label>{activeEvent.ticket_price}</p>
              <button className="close-btn" onClick={() => setActiveEvent(null)}>✕</button>
            </div>
          </div>
        )}
       
        
</section>

      {/* Book Now Section */}
      <section className="book-now-section">
        <div className="book-now-container">
          <h2>Book Your Spot Now!</h2>
          <p>Reserve your seat for upcoming events and never miss out on exciting experiences.</p>
          <button
            className="book-now-btn"
            onClick={() => {
              if (isLoggedIn) window.location.href = "/EventBooking";
              else setShowPopup(true);
            }}
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Login Popup */}
      {showPopup && (
        <div className="overlay">
          <div className="popup-card">
            <p>To book this event, please login or sign up first.</p>
            <div className="popup-buttons">
              <button onClick={() => { localStorage.setItem("redirectAfterLogin","/EventBooking"); window.location.href="/login"; }}>Login</button>
              <button onClick={() => { localStorage.setItem("redirectAfterLogin","/EventBooking"); window.location.href="/signup"; }}>Sign Up</button>
              <button onClick={() => setShowPopup(false)} style={{ marginTop:"12px" }}>Go Back</button>
            </div>
          </div>
        </div>
      )}

      {/* About Us Section */}
      <section id="about-us" className="about-us-section">
        <div className="about-us-container">
          <div className="about-text">
            <h2>About Us</h2>
            <p>
              We are dedicated to bringing the best events and experiences to our community.
              From workshops to conferences, we make sure every event is memorable.
            </p>
          </div>
          <div className="about-image">
            <img src={about} alt="About Us Image" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
