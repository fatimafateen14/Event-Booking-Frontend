import React from "react";
import { Link } from "react-router-dom";
import "../Components/navbar.css";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="top-left">
        <img src={logo} className="logo" alt="EventAI" />
        <div className="text-box">
          <h1>EventAI</h1>
          <p>Your Event Partner</p>
        </div>
      </div>

      <div className="top-right">
        <Link to="/login">
          <button className="btn login-btn">Login</button>
        </Link>

        <Link to="/signup">
          <button className="btn signup-btn">Sign Up</button>
        </Link>
      </div>

      <div className="center-pill">
        <ul className="pill-items">
          <li className="pill-item">
            <Link to="/">Home</Link>
          </li>
          <li className="pill-item">
            <Link to="/EventBooking">Book Events</Link>
          </li>
          <li className="pill-item">
            <Link to="/EventBooking">Profile</Link>
          </li>
          <li className="pill-item">
            <Link to="/">About us</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}
