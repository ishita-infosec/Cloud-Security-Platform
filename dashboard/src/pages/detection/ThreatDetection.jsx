import { useEffect, useState } from "react";
import {
  Crosshair,
  ShieldAlert,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

import { getEvents } from "../../services/api";

function ThreatDetection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadDetectionData() {
    try {
      setLoading(true);

      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Threat Detection error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDetectionData();
  }, []);

  const suspiciousEvents = events.filter(
    (event) => event.is_suspicious === true
  );

  const detectedRules = new Set(
    suspiciousEvents.map((event) => event.event_name)
  );

  const rules = [
    {
      name: "Console Login Monitoring",
      event: "ConsoleLogin",
      category: "Authentication",
      severity: "Low",
      description: "Detects AWS console login activity",
    },
    {
      name: "Access Key Creation",
      event: "CreateAccessKey",
      category: "IAM",
      severity: "Medium",
      description: "Detects creation of new AWS access keys",
    },
    {
      name: "User Creation",
      event: "CreateUser",
      category: "IAM",
      severity: "Medium",
      description: "Detects creation of new IAM users",
    },
    {
      name: "User Policy Attachment",
      event: "AttachUserPolicy",
      category: "Privilege Escalation",
      severity: "High",
      description: "Detects policy attachment to IAM users",
    },
    {
      name: "Role Policy Attachment",
      event: "AttachRolePolicy",
      category: "Privilege Escalation",
      severity: "High",
      description: "Detects policy attachment to IAM roles",
    },
    {
      name: "Inline User Policy",
      event: "PutUserPolicy",
      category: "Privilege Escalation",
      severity: "High",
      description: "Detects inline policy changes on users",
    },
    {
      name: "Inline Role Policy",
      event: "PutRolePolicy",
      category: "Privilege Escalation",
      severity: "High",
      description: "Detects inline policy changes on roles",
    },
    {
      name: "CloudTrail Deletion",
      event: "DeleteTrail",
      category: "Defense Evasion",
      severity: "Critical",
      description: "Detects deletion of CloudTrail trails",
    },
    {
      name: "CloudTrail Logging Disabled",
      event: "StopLogging",
      category: "Defense Evasion",
      severity: "Critical",
      description: "Detects attempts to stop CloudTrail logging",
    },
  ];

  const activeRules = rules.filter((rule) =>
    detectedRules.has(rule.event)
  ).length;

  const highSeverityRules = rules.filter(
    (rule) =>
      rule.severity === "High" ||
      rule.severity === "Critical"
  ).length;

  return (
    <div className="overview-page">
      <div className="page-header">
        <div>
          <h2>Threat Detection</h2>
          <p>
            Security detection rules monitoring AWS CloudTrail activity
          </p>
        </div>

        <div className="live-status">
          <span></span>
          Detection Engine Active
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Detection Rules</span>
          <strong>{rules.length}</strong>
          <small>Configured security rules</small>
        </div>

        <div className="stat-card">
          <span>Active Rules</span>
          <strong>{activeRules}</strong>
          <small>Rules triggered by events</small>
        </div>

        <div className="stat-card">
          <span>Suspicious Events</span>
          <strong>{loading ? "..." : suspiciousEvents.length}</strong>
          <small>Detected activities</small>
        </div>

        <div className="stat-card">
          <span>High Severity Rules</span>
          <strong>{highSeverityRules}</strong>
          <small>High and critical detections</small>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <div>
            <h3>Detection Engine</h3>
            <p>
              Rule-based detection for security-sensitive AWS activities
            </p>
          </div>

          <button
            className="events-refresh-button"
            onClick={loadDetectionData}
            title="Refresh detection data"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        <div className="health-list">
          <div className="health-row">
            <span>CloudTrail Event Monitoring</span>
            <strong>
              <i></i>
              Active
            </strong>
          </div>

          <div className="health-row">
            <span>Rule Evaluation</span>
            <strong>
              <i></i>
              Operational
            </strong>
          </div>

          <div className="health-row">
            <span>Suspicious Activity Detection</span>
            <strong>
              <i></i>
              Operational
            </strong>
          </div>

          <div className="health-row">
            <span>Risk Scoring Integration</span>
            <strong>
              <i></i>
              Connected
            </strong>
          </div>
        </div>
      </div>

      <div className="dashboard-card" style={{ marginTop: "16px" }}>
        <div className="card-header">
          <div>
            <h3>Detection Rules</h3>
            <p>
              Rules used to identify potentially risky AWS behavior
            </p>
          </div>

          <Crosshair size={20} />
        </div>

        {loading ? (
          <div className="events-message">
            Loading detection rules...
          </div>
        ) : (
          <div className="events-table-wrapper">
            <table className="events-table">
              <thead>
                <tr>
                  <th>Rule</th>
                  <th>Event</th>
                  <th>Category</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>

              <tbody>
                {rules.map((rule) => {
                  const triggered = detectedRules.has(rule.event);

                  return (
                    <tr key={rule.event}>
                      <td>
                        <strong>{rule.name}</strong>
                      </td>

                      <td>{rule.event}</td>

                      <td>{rule.category}</td>

                      <td>
                        <span
                          className={`severity ${rule.severity.toLowerCase()}`}
                        >
                          {rule.severity}
                        </span>
                      </td>

                      <td>
                        {triggered ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              color: "var(--danger)",
                              fontSize: "10px",
                              fontWeight: "600",
                            }}
                          >
                            <ShieldAlert size={13} />
                            Triggered
                          </span>
                        ) : (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              color: "var(--success)",
                              fontSize: "10px",
                              fontWeight: "600",
                            }}
                          >
                            <CheckCircle size={13} />
                            Monitoring
                          </span>
                        )}
                      </td>

                      <td>{rule.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThreatDetection;