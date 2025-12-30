import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import your pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Events from "./pages/Events.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import EventBooking from "./pages/EventBooking.jsx";
import EventDashboard from "./pages/admin/EventDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Other pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/eventbooking" element={<EventBooking />} />
        <Route path="/profile" element={<UserProfile />} />

        
        {/* Admin routes (protected) */}
      <Route
        path="/admin/dashboard"
        element={<EventDashboard />
        }
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
