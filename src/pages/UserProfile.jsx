import React, { useState, useEffect } from "react";
import "./Profile.css";
import Account from "../assets/Account.mp4";

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // --------------------------
  // FETCH PROFILE DATA FROM DB
  // --------------------------
  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          password: "",
        });
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.name, email: data.email })
        );
      })
      .catch((err) => console.error("Failed to fetch profile:", err));
  };

  // --------------------------
  // CHECK LOGIN ON MOUNT (LIKE EVENTBOOKING)
  // --------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUserInfo({ ...userInfo, name: storedUser.name, email: storedUser.email });
      fetchProfile(); // fetch latest profile from DB
    } else {
      setIsLoggedIn(false); // show popup
    }
  }, []);

  // --------------------------
  // SAVE PROFILE CHANGES
  // --------------------------
  const handleSave = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const body = {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
    };
    if (userInfo.password.trim() !== "") body.password = userInfo.password;

    fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((updated) => {
        alert("Profile updated successfully!");
        setIsEditing(false);
        setUserInfo({ ...updated, password: "" });
        localStorage.setItem(
          "user",
          JSON.stringify({ name: updated.name, email: updated.email })
        );
      })
      .catch(() => alert("Failed to update profile. Try again."));
  };

  // --------------------------
  // LOGOUT
  // --------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // --------------------------
  // REDIRECT TO LOGIN/SIGNUP
  // --------------------------
  const handleRedirect = (path) => {
    localStorage.setItem("redirectAfterLogin", "/profile");
    window.location.href = path;
  };

  // Prevent flash
  if (isLoggedIn === null) return null;

  return (
    <div className="profile-wrapper">
      {/* POPUP IF NOT LOGGED IN */}
      {!isLoggedIn && (
        <div className="overlay">
          <div className="popup-card">
            <p>Please login or sign up to access your profile.</p>
            <div className="popup-buttons">
              <button onClick={() => handleRedirect("/login")}>Login</button>
              <button onClick={() => handleRedirect("/signup")}>Sign Up</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <div className={`profile-sidebar ${!isLoggedIn ? "blurred" : ""}`}>
        <h2>{userInfo.name || "User"}</h2>
        <div className="sidebar-details">
          <p><b>Email:</b> {userInfo.email}</p>
          <p><b>Phone:</b> {userInfo.phone}</p>
        </div>
        
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
        <div className="sidebar-video-wrapper">
          <video src={Account} autoPlay loop muted className="sidebar-video" playsInline />
        </div>
      </div>

      {/* MAIN PROFILE AREA */}
      <div className={`profile-main ${isEditing ? "editing" : ""} ${!isLoggedIn ? "blurred" : ""}`}>
        <h1>My Profile</h1>
        <p className="sub-text">View or update your personal information.</p>

        {!isEditing ? (
          <div className="info-grid">
            {Object.entries(userInfo).map(([key, value]) => (
              <div key={key} className="info-block">
                <label>{key === "name" ? "Full Name" : key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <p>{key === "password" ? "••••••••" : value || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <form className="edit-form" onSubmit={handleSave}>
            <input type="text" placeholder="Full Name" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} required />
            <input type="email" placeholder="Email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} required />
            <input type="tel" placeholder="Phone Number" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} pattern="[0-9\-+ ]+" required />
            <input type="password" placeholder="New Password (optional)" value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
            <button className="save-btn" type="submit">Save Changes</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;