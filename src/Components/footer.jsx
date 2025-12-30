import React, { useState } from "react";
import "../Components/footer.css";

export default function Footer() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-left">
            <h3>EventAI</h3>
            <p>&copy; 2025 All rights reserved.</p>
          </div>

          <div className="footer-right">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/EventBooking">Book</a></li>

              {/* Contact button */}
              <li>
                <button
                  className="contact-btn"
                  onClick={() => setShowContact(true)}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Contact Popup */}
      {showContact && (
        <div className="contact-overlay">
          <div className="contact-popup">
            <span
              className="close-btn"
              onClick={() => setShowContact(false)}
            >
              ✕
            </span>

            <h3>Contact Us</h3>

           <div className="social-icons">
  <a href="https://instagram.com" target="_blank">
    <i className="fa-brands fa-instagram"></i>
  </a>

  <a href="https://facebook.com" target="_blank">
    <i className="fa-brands fa-facebook-f"></i>
  </a>

  <a href="https://twitter.com" target="_blank">
    <i className="fa-brands fa-x-twitter"></i>
  </a>

  <a href="https://wa.me/923001234567" target="_blank">
    <i className="fa-brands fa-whatsapp"></i>
  </a>
</div>


            <a href="https://workspace.google.com/gmail/" target="_blank">
           EventAi@gmail.com
  </a>
            <p>Phone: +92 300 1234567</p>
          </div>
        </div>
      )}
    </>
  );
}