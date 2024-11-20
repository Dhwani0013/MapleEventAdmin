import React from "react";
import "./Sidebar.css";

const Sidebar = ({ setSection }) => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li onClick={() => setSection("services")}>Services</li>
        <li onClick={() => setSection("portfolio")}>Portfolio</li>
        <li onClick={() => setSection("events")}>Events</li>
        <li onClick={() => setSection("budget")}>Budget</li>
        <li onClick={() => setSection("userProfile")}>User Profile</li>
      </ul>

      <div
        className="logout"
        onClick={() => setSection("settings")} // Adjust if Logout has a different handler
      >
        Logout
      </div>
    </div>
    
  );
};

export default Sidebar;
