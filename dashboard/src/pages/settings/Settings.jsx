import { useState } from "react";
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Server,
  Cloud,
  Database,
  ShieldCheck,
  Save,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  function saveSettings() {
    localStorage.setItem(
      "cloudshield-auto-refresh",
      String(autoRefresh)
    );

    localStorage.setItem(
      "cloudshield-notifications",
      String(notifications)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  return (
    <div className="overview-page">
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p>
            Configure CloudShield security monitoring preferences
          </p>
        </div>

        <div className="live-status">
          <span></span>
          Configuration
        </div>
      </div>

      <div className="overview-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Appearance</h3>
              <p>Customize the dashboard interface</p>
            </div>

            {theme === "dark" ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </div>

          <div className="health-list">
            <div className="health-row">
              <div>
                <span>Dashboard Theme</span>
                <small
                  style={{
                    display: "block",
                    marginTop: "3px",
                    color: "var(--text-muted)",
                    fontSize: "9px",
                  }}
                >
                  Current interface appearance
                </small>
              </div>

              <button
                className="events-refresh-button"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={14} />
                    Light
                  </>
                ) : (
                  <>
                    <Moon size={14} />
                    Dark
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Monitoring</h3>
              <p>Security monitoring preferences</p>
            </div>

            <ShieldCheck size={20} />
          </div>

          <div className="health-list">
            <div className="health-row">
              <span>Auto Refresh</span>

              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "5px 10px",
                  background: autoRefresh
                    ? "rgba(34,197,94,.12)"
                    : "var(--bg-secondary)",
                  color: autoRefresh
                    ? "var(--success)"
                    : "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: "9px",
                  fontWeight: "600",
                }}
              >
                {autoRefresh ? "ON" : "OFF"}
              </button>
            </div>

            <div className="health-row">
              <span>Security Notifications</span>

              <button
                onClick={() =>
                  setNotifications(!notifications)
                }
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "5px 10px",
                  background: notifications
                    ? "rgba(34,197,94,.12)"
                    : "var(--bg-secondary)",
                  color: notifications
                    ? "var(--success)"
                    : "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: "9px",
                  fontWeight: "600",
                }}
              >
                {notifications ? "ON" : "OFF"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="dashboard-card"
        style={{ marginTop: "16px" }}
      >
        <div className="card-header">
          <div>
            <h3>Platform Configuration</h3>
            <p>Current CloudShield environment</p>
          </div>

          <SettingsIcon size={20} />
        </div>

        <div className="health-list">
          <div className="health-row">
            <span>
              <strong>AWS Region</strong>
            </span>

            <span
              style={{
                color: "var(--text-secondary)",
              }}
            >
              eu-north-1
            </span>
          </div>

          <div className="health-row">
            <span>
              <strong>CloudTrail</strong>
            </span>

            <span
              style={{
                color: "var(--success)",
              }}
            >
              cloud-security-trail
            </span>
          </div>

          <div className="health-row">
            <span>
              <strong>Backend</strong>
            </span>

            <span
              style={{
                color: "var(--success)",
              }}
            >
              FastAPI
            </span>
          </div>

          <div className="health-row">
            <span>
              <strong>Database</strong>
            </span>

            <span
              style={{
                color: "var(--text-secondary)",
              }}
            >
              SQLite
            </span>
          </div>

          <div className="health-row">
            <span>
              <strong>Frontend</strong>
            </span>

            <span
              style={{
                color: "var(--text-secondary)",
              }}
            >
              React + Vite
            </span>
          </div>

          <div className="health-row">
            <span>
              <strong>Detection</strong>
            </span>

            <span
              style={{
                color: "var(--success)",
              }}
            >
              Rule-based Detection
            </span>
          </div>
        </div>
      </div>

      <div
        className="overview-grid"
        style={{ marginTop: "16px" }}
      >
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Architecture</h3>
              <p>Security monitoring pipeline</p>
            </div>

            <Cloud size={20} />
          </div>

          <div className="health-list">
            {[
              ["AWS CloudTrail", "Event Source"],
              ["Collector", "Ingestion"],
              ["Normalizer", "Normalization"],
              ["Detection Engine", "Threat Detection"],
              ["Risk Engine", "Risk Scoring"],
              ["SQLite", "Storage"],
              ["FastAPI", "API"],
              ["React", "Dashboard"],
            ].map(([name, role]) => (
              <div className="health-row" key={name}>
                <span>{name}</span>

                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "9px",
                  }}
                >
                  {role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Technology Stack</h3>
              <p>Current implementation</p>
            </div>

            <Database size={20} />
          </div>

          <div className="health-list">
            {[
              "Python",
              "Boto3",
              "AWS CloudTrail",
              "SQLite",
              "FastAPI",
              "React",
              "Vite",
            ].map((technology) => (
              <div
                className="health-row"
                key={technology}
              >
                <span>{technology}</span>

                <span
                  style={{
                    color: "var(--success)",
                    fontSize: "9px",
                  }}
                >
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="dashboard-card"
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "14px",
            }}
          >
            Save Configuration
          </h3>

          <p
            style={{
              margin: "5px 0 0",
              color: "var(--text-secondary)",
              fontSize: "10px",
            }}
          >
            Save your dashboard preferences locally.
          </p>
        </div>

        <button
          className="events-refresh-button"
          onClick={saveSettings}
        >
          <Save size={15} />

          {saved ? "Saved" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

export default Settings;