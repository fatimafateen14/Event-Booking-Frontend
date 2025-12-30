import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Popup state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [showMessage, setShowMessage] = useState(false);

  const showPopup = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Save token
        localStorage.setItem("token", data.token);

        // ✅ FIX: Correct fullname saving
        const userName =
          data.user?.fullName ||     // correct from signup
          data.user?.fullname ||     // fallback
          data.user?.name ||         // backend name fallback
          email;                     // final fallback

        // Save user data
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.user.id,  
            name: userName,
            email: data.user?.email || email,
          })
        );

        showPopup("Successfully logged in!", "success");

        // ✅ FIX: Only ONE redirect (yours was duplicated)
        const redirect = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");

        setTimeout(() => {
          window.location.href = redirect;
        }, 1500);
      } else {
        showPopup(data.message || "Login failed", "error");
      }
    } catch (err) {
      console.error(err);
      showPopup("Something went wrong", "error");
    }
  };

  return (
    <div
      className="container-fluid d-flex vh-100 p-0"
      style={{
        backgroundColor: "#160430",
        fontFamily:
          '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Left Section */}
      <div className="signup-left">
        <div className="logo-section">
          <img src="src/assets/logo.png" alt="EventAI Logo" className="logo-img" />
          <div className="logo-text">
            <div className="logo-name">EventAI</div>
            <div className="logo-tagline">Your Event Partner</div>
          </div>
        </div>

        <img src="src/assets/background.png" alt="Space background" className="background-image" />

        <div className="bottom-text">
          <h2>
            <span className="text-white">LOGIN IN TO BOOK</span>
            <span className="text-gradient">YOUR EVENTS!</span>
          </h2>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="col-md-6 d-flex align-items-center justify-content-center p-4"
        style={{ backgroundColor: "#160430" }}
      >
        <div className="w-100" style={{ maxWidth: "420px" }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "700",
              color: "white",
              margin: "0 0 30px 0",
              letterSpacing: "1px",
            }}
          >
            LOGIN
          </h1>

        <form onSubmit={handleSubmit}>
  {/* Email */}
  <div className="mb-3">
    <label htmlFor="email" className="form-label" style={{ color: "white" }}>
      Email address
    </label>
    <input
      type="email"
      id="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="form-input"   // same class
      required
    />
  </div>

  {/* Password */}
  <div style={{ position: "relative" }}>
        <label htmlFor="email" className="form-label" style={{ color: "white" }}>
      Password
    </label>
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="form-input"   // same class
      style={{ paddingRight: "50px" }} // extra padding for eye icon
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      style={{
        position: "absolute",
        right: "10px",
        top: "65%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        color: "white",
        fontSize: "22px",
        cursor: "pointer",
        opacity: 0.8,
      }}
    >
      {showPassword ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>


            {/* Login Button */}
            <button
              type="submit"
              className="btn w-100 mt-3"
              style={{
                background: "linear-gradient(135deg, #501794 0%, #7b2ff7 50%, #ae69ff 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              Login
            </button>

            {/* Popup Message */}
            {showMessage && (
              <div
                style={{
                  marginTop: "12px",
                  padding: "10px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  textAlign: "center",
                  backgroundColor: messageType === "success" ? "#501794" : "#FF4D4F",
                  color: "white",
                }}
              >
                {message}
              </div>
            )}
          </form>

          <div
            style={{
              height: "1px",
              backgroundColor: "rgba(80,23,148,0.3)",
              marginTop: "24px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}