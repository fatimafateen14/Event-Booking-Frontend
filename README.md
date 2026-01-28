# 🎟️ EventAI Frontend

A modern and responsive **Event Booking Frontend** built using **React (Vite / Next.js style)** that allows users to browse events, view details, and book tickets, while admins can manage events through a dashboard interface.

This frontend connects to a **Node.js + Express + PostgreSQL backend**.

---

## ✨ Features

### 👤 User Side

* View all available events
* See event details (date, time, location, price, slots)
* Book tickets for events
* View profile info (name & email from backend)

### 🛠️ Admin Side

* Create new events
* Edit existing events
* Delete events
* Upload event flyers (image path based)
* Track available and booked slots

---

## 🖼️ UI Highlights

* Responsive layout
* Modern event cards
* Booking modal system
* Admin dashboard
* Progress bar for slot occupancy
* Clean CSS-based design

---

## ⚙️ Tech Stack

* **Frontend:** React (Vite / Next.js compatible)
* **Styling:** CSS
* **Backend:** Node.js, Express
* **Database:** PostgreSQL
* **API Communication:** Fetch API

---

## 📁 Project Structure

```
frontend/
│
├── src/
│   ├── components/
│   │   ├── EventCard.jsx
│   │   ├── EventBooking.jsx
│   │   ├── BookingModal.jsx
│   │   ├── UserProfile.jsx
│   │   ├── EventDashboard.jsx
│   │   ├── EventForm.jsx
│   │   └── EventList.jsx
│   │
│   ├── styles/
│   │   ├── event-booking.css
│   │   ├── EventCard.css
│   │   └── EventDashboard.css
│   │
│   └── main.jsx
│
├── public/
│   └── uploads/
│       └── events/
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Event-Booking-Frontend.git
cd Event-Booking-Frontend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Start Development Server

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

(or `http://localhost:3000` for Next.js)

---

## 🔗 Backend Connection

Make sure your backend is running at:

```
http://localhost:5000
```

The frontend uses these API endpoints:

| Feature      | Endpoint          |
| ------------ | ----------------- |
| Get Events   | `/api/events`     |
| Book Event   | `/api/bookings`   |
| Get User     | `/api/auth/me`    |
| Add Event    | `/api/events/add` |
| Update Event | `/api/events/:id` |
| Delete Event | `/api/events/:id` |

---

## 🖼️ Image Upload System

Images are stored as **file paths** in the database.

### Folder Structure:

```
backend/uploads/events/
```

### Display Logic:

Frontend loads images like:

```js
<img src={`http://localhost:5000${event.flyer}`} />
```

---

## 🧪 Sample Environment

Make sure backend `.env` includes:

```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/eventai
JWT_SECRET=your_secret_key
```

---

## 📌 Important Notes

* This frontend **requires the backend API to be running**
* Booking system updates available slots dynamically
* Admin panel supports full CRUD operations for events

---

## 🧠 Future Improvements

* Role-based UI (Admin / User)
* Booking history page
* Event categories
* Payment gateway integration

---

## 👨‍💻 Developed By

**Fateen Fatima**
Full Stack Developer
EventAI Project

---

## ⭐ Support

If you like this project, don’t forget to:

```bash
⭐ Star the repository on GitHub
```

