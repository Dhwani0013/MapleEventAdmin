import React from "react";
import EventTable from "../Components/eventsTable";
import StatsCard from "../Components/StatCard";
import EventDetails from "../Components/eventsDetails";
import { events } from "../Data/events";
import "./dashboard.css";

const Dashboard = () => {
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees, 0);
  const totalEvents = events.length;

  return (
    <div className="dashboard">
      <h1 className="dashboard-header">Event Management Dashboard</h1>
      <div className="dashboard-stats">
        <StatsCard title="Total Events" value={totalEvents} />
        <StatsCard title="Total Attendees" value={totalAttendees} />
      </div>
      <div className="dashboard-section">
        <h2>Events</h2>
        <EventTable />
      </div>
      <div className="dashboard-section">
        <h2>Event Details</h2>
        <EventDetails />
      </div>
    </div>
  );
};

export default Dashboard;
