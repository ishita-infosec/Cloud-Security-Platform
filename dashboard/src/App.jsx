import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

import Overview from "./pages/overview/Overview";
import Alerts from "./pages/alerts/Alerts";
import Events from "./pages/events/Events";
import Incidents from "./pages/incidents/Incidents";
import RiskAnalysis from "./pages/risk/RiskAnalysis";
import AWSAssets from "./pages/assets/AWSAssets";
import ThreatDetection from "./pages/detection/ThreatDetection";
import SystemHealth from "./pages/system/SystemHealth";
import Settings from "./pages/settings/Settings";

import { ThemeProvider } from "./context/ThemeContext";

import "./App.css";

function AppContent() {
  const [activePage, setActivePage] = useState("Overview");

  let page;

  if (activePage === "Overview") {
    page = <Overview />;
  } else if (activePage === "Alerts") {
    page = <Alerts />;
  } else if (activePage === "Incidents") {
    page = <Incidents />;
  } else if (activePage === "Events") {
    page = <Events />;
  } else if (activePage === "Risk Analysis") {
    page = <RiskAnalysis />;
  } else if (activePage === "AWS Assets") {
    page = <AWSAssets />;
  } else if (activePage === "Threat Detection") {
    page = <ThreatDetection />;
  } else if (activePage === "System Health") {
    page = <SystemHealth />;
  } else if (activePage === "Settings") {
    page = <Settings />;
  } else {
    page = (
      <div className="dashboard-card">
        <h2>{activePage}</h2>
        <p>This section is coming next.</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <Topbar />

        <div className="page-content">
          {page}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;