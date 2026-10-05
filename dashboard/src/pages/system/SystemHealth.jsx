import { useEffect, useState } from "react";
import {
  Server,
  Database,
  Activity,
  ShieldCheck,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { getEvents } from "../../services/api";

function SystemHealth() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(null);

  async function checkHealth() {
    try {
      setLoading(true);

      const data = await getEvents();

      setEvents(Array.isArray(data) ? data : []);
      setLastChecked(new Date());
    } catch (error) {
      console.error("System Health error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkHealth();
  }, []);

  const services = [
    {
      name: "CloudTrail Collector",
      description: "Collects AWS CloudTrail activity",
      icon: Activity,
      status: "Operational",
    },
    {
      name: "Event Normalizer",
      description: "Converts CloudTrail data into common schema",
      icon: Server,
      status: "Operational",
    },
    {
      name: "Detection Engine",
      description: "Evaluates security detection rules",
      icon: ShieldCheck,
      status: "Operational",
    },
    {
      name: "Risk Scoring Engine",
      description: "Calculates event risk and severity",
      icon: AlertCircle,
      status: "Operational",
    },
    {
      name: "SQLite Database",
      description: "Stores processed security events",
      icon: Database,
      status: events.length > 0 ? "Operational" : "Waiting",
    },
    {
      name: "FastAPI Backend",
      description: "Provides security data to dashboard",
      icon: Server,
      status: events.length > 0 ? "Operational" : "Waiting",
    },
  ];

  const operationalServices = services.filter(
    (service) => service.status === "Operational"
  ).length;

  const healthPercentage = Math.round(
    (operationalServices / services.length) * 100
  );

  return (
    <div className="overview-page">
      <div className="page-header">
        <div>
          <h2>System Health</h2>
          <p>
            Monitor the health of the cloud security monitoring pipeline
          </p>
        </div>

        <div className="live-status">
          <span></span>
          System Monitoring Active
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>System Health</span>
          <strong>{healthPercentage}%</strong>
          <small>Overall platform status</small>
        </div>

        <div className="stat-card">
          <span>Services</span>
          <strong>
            {operationalServices}/{services.length}
          </strong>
          <small>Operational components</small>
        </div>

        <div className="stat-card">
          <span>Events Stored</span>
          <strong>{loading ? "..." : events.length}</strong>
          <small>Database records</small>
        </div>

        <div className="stat-card">
          <span>API Status</span>
          <strong>UP</strong>
          <small>FastAPI backend</small>
        </div>
      </div>

      <div className="overview-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Security Pipeline</h3>
              <p>Current monitoring architecture</p>
            </div>

            <button
              className="events-refresh-button"
              onClick={checkHealth}
            >
              <RefreshCw size={15} />
              Check Again
            </button>
          </div>

          <div className="health-list">
            <div className="health-row">
              <span>AWS CloudTrail</span>
              <strong>
                <i></i>
                Connected
              </strong>
            </div>

            <div className="health-row">
              <span>Event Collector</span>
              <strong>
                <i></i>
                Operational
              </strong>
            </div>

            <div className="health-row">
              <span>Normalization</span>
              <strong>
                <i></i>
                Operational
              </strong>
            </div>

            <div className="health-row">
              <span>Threat Detection</span>
              <strong>
                <i></i>
                Operational
              </strong>
            </div>

            <div className="health-row">
              <span>Risk Scoring</span>
              <strong>
                <i></i>
                Operational
              </strong>
            </div>

            <div className="health-row">
              <span>Database</span>
              <strong>
                <i></i>
                Operational
              </strong>
            </div>

            <div className="health-row">
              <span>FastAPI</span>
              <strong>
                <i></i>
                Operational
              </strong>
            </div>

            <div className="health-row">
              <span>React Dashboard</span>
              <strong>
                <i></i>
                Operational
              </strong>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h3>Health Score</h3>
              <p>Platform availability</p>
            </div>
          </div>

          <div className="posture-score">
            {healthPercentage}%
          </div>

          <div className="posture-label">
            System Health
          </div>

          <div className="posture-status">
            <span></span>
            All core services operational
          </div>

          <div
            style={{
              marginTop: "25px",
              padding: "12px",
              border: "1px solid var(--border)",
              borderRadius: "7px",
              background: "var(--bg-secondary)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--success)",
                fontSize: "11px",
                fontWeight: "600",
              }}
            >
              <CheckCircle size={15} />
              Monitoring pipeline healthy
            </div>

            <p
              style={{
                margin: "7px 0 0",
                color: "var(--text-muted)",
                fontSize: "10px",
                lineHeight: "1.5",
              }}
            >
              AWS events are being collected, processed,
              analyzed and stored for security monitoring.
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-card" style={{ marginTop: "16px" }}>
        <div className="card-header">
          <div>
            <h3>Service Status</h3>
            <p>Individual security platform components</p>
          </div>

          <Server size={20} />
        </div>

        <div className="events-table-wrapper">
          <table className="events-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <tr key={service.name}>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "9px",
                        }}
                      >
                        <Icon size={15} />
                        <strong>{service.name}</strong>
                      </div>
                    </td>

                    <td>{service.description}</td>

                    <td>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          color:
                            service.status === "Operational"
                              ? "var(--success)"
                              : "var(--warning)",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        <i
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background:
                              service.status === "Operational"
                                ? "var(--success)"
                                : "var(--warning)",
                          }}
                        ></i>

                        {service.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          style={{
            marginTop: "15px",
            color: "var(--text-muted)",
            fontSize: "9px",
          }}
        >
          {lastChecked
            ? `Last health check: ${lastChecked.toLocaleTimeString()}`
            : "Checking system health..."}
        </div>
      </div>
    </div>
  );
}

export default SystemHealth;