import React, { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Services from "./Components/Services/Services";
import Portfolio from "./Components/Portfolio/Portfolio";
import Budget from "./Components/Budget/Budget";
import UserProfile from "./Components/UserProfile/UserProfile";
import Events from "./Components/Events/Events";
import "./App.css";

const App = () => {
  const [section, setSection] = useState("services");

  const renderSection = () => {
    switch (section) {
      case "services":
        return <Services />;
      case "portfolio":
        return <Portfolio />;
        case "events":
          return <Events/>;
      case "budget":
        return <Budget />;
      case "userProfile":
        return <UserProfile />;
      
      default:
        return <Services />;
    }
  };

  return (
    <div className="app">
      <Sidebar setSection={setSection} />
      <div className="content">{renderSection()}</div>
    </div>
  );
};

export default App;
