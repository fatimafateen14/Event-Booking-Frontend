import { useState } from "react";
import "./AdminLogin.css";

export default function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 HARD-CODED ADMIN CREDENTIALS (NOT SHOWN ANYWHERE)
  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "password123";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Simulate login check
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        onLoginSuccess(); // ✅ THIS WAS MISSING BEFORE
      } else {
        setError("Invalid admin credentials");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">

          {/* Header */}
          {/* Header */} <div className="login-header"> <div className="header-icon"> 
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"> 
                <circle cx="12" cy="12" r="1" /> <path d="M12 1v6m0 6v6" /> 
                <path d="M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24" /> <path d="M1 12h6m6 0h6" />
                 <path d="M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" /> </svg> 
          </div> <h1>Admin Dashboard</h1> <p>Manage your events with ease</p> </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

        </div>
        
      </div>
    </div>
  );
}
