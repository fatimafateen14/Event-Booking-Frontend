import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Success/Error message
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("success");

  // Set redirect
  useEffect(() => {
    if (!localStorage.getItem("redirectAfterLogin")) {
      localStorage.setItem("redirectAfterLogin", document.referrer || "/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Successfully signed up!");
        setMessageType("success");
        setShowMessage(true);

        // Store user info
        localStorage.setItem(
          "user",
          JSON.stringify({ name: formData.fullName, email: formData.email })
        );
        localStorage.setItem("token", data.token);

        // Redirect after signup
        const redirect = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        setTimeout(() => {
          window.location.href = redirect;
        }, 1200);
      } else {
        setMessage(data.message || "Signup failed");
        setMessageType("error");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 1500);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
      setMessageType("error");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1500);
    }
  };

  return (
    <div className="signup-container">
      {/* Left Side */}
      <div className="signup-left">
        <div className="logo-section">
          <img src="src/assets/logo.png" alt="EventAI Logo" className="logo-img" />
          <div className="logo-text">
            <div className="logo-name">EventAI</div>
            <div className="logo-tagline">Your Event Partner</div>
          </div>
        </div>

        <img src="src/assets/background.png" alt="Background" className="background-image" />

        <div className="bottom-text">
          <h2>
            <span className="text-white">SIGN IN TO BOOK</span>
            <span className="text-gradient">YOUR EVENTS!</span>
          </h2>
        </div>
      </div>

      {/* Right Side */}
      <div className="signup-right">
        <div className="form-wrapper">
          <h2 className="signup-title">SIGN UP</h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button type="submit" className="signup-button">Sign Up</button>

            {/* Inline Message */}
            {showMessage && (
              <div className={`inline-message ${messageType}`}>
                {message}
              </div>
            )}
          </form>

          <div className="divider"></div>

          <p className="signin-text">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
