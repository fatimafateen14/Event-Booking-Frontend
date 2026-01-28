import { useState, useEffect } from "react"
import "../styles/user-profile.css"

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)

  // ✅ Keep formData in sync with latest user prop
  useEffect(() => {
    setFormData(user)
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="user-profile-card">
      <div className="profile-avatar">
        <div className="avatar-placeholder">
          {user.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
      </div>

      <div className="profile-content">
        <h3 className="profile-title">Profile</h3>

        {isEditing ? (
          <div className="profile-form">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{formData.name}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{formData.email}</span>
            </div>
          </div>
        )}

        
      </div>
    </div>
  )
}

export default UserProfile