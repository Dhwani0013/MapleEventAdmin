import React, { useState } from "react";
import "./UserProfile.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "Parth Patel",
    email: "parth@example.com",
    phone: "123-456-7890",
    address: "555 chablis Dr, Waterloo",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result); // Store the image data as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };
  const triggerFileInput = () => {
    document.getElementById("photo-input").click();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-container">
      <div className="profile-photo">
          <img
            src={
              profilePhoto ||
              "https://via.placeholder.com/150?text=Profile+Photo"
            }
            alt="Profile"
            onClick={isEditing ? triggerFileInput : null}
            className={isEditing ? "clickable" : ""}
          />
            <input
            type="file"
            id="photo-input"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
          />
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-actions">
            {isEditing ? (
              <button type="button" onClick={handleSave}>
                Save
              </button>
            ) : (
              <button type="button" onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
