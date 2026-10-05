import { useEffect, useState } from "react";
import { getSummary, getEvents } from "../../services/api";

function Overview() {
  const [summary, setSummary] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setApiError(false);

        const [summaryData, eventsData] = await Promise.all([
          getSummary(),
          getEvents(),
        ]);

        setSummary(summaryData);
        setEvents(eventsData);
      } catch (error) {
        console.error("Dashboard API error:", error);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const totalEvents = summary?.total_events ?? 0;
  const suspiciousEvents = summary?.suspicious_events ?? 0;
  const highRisk = summary?.high_risk_events ?? 0;
  const criticalRisk = summary?.critical_risk_events ?? 0;

  const recentEvents = events.slice(0, 5);

  const lowRisk = Math.max(
    totalEvents - suspiciousEvents,
    0
  );

  return (
    <div className="overview-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <h2>Security Overview</h2>
          <p>Real-time AWS cloud security monitoring</p>
        </div>

        <div className="live-status">
          <span></span>
          Monitoring Active
        </div>
      </div>

      {/* API ERROR */}
      {apiError && (
        <div className="api-error">
          Unable to connect to FastAPI. Make sure the backend is running.
        </div>
      )}

      {/* STAT CARDS */}
      <div className="stats-grid">

        <div className="stat-card">
          <span>Total Events</span>

          <strong>
            {loading ? "..." : totalEvents}
          </strong>

          <small>CloudTrail events</small>
        </div>

        <div className="stat-card">
          <span>Suspicious Events</span>

          <strong>
            {loading ? "..." : suspiciousEvents}
          </strong>

          <small>Requires attention</small>
        </div>

        <div className="stat-card">
          <span>High Risk</span>

          <strong>
            {loading ? "..." : highRisk}
          </strong>

          <small>High severity events</small>
        </div>

        <div className="stat-card">
          <span>Critical Risk</span>

          <strong>
            {loading ? "..." : criticalRisk}
          </strong>

          <small>Critical severity events</small>
        </div>

      </div>

      {/* EVENT ACTIVITY + SECURITY POSTURE */}
      <div className="overview-grid">

        <div className="dashboard-card event-activity">

          <div className="card-header">

            <div>
              <h3>Event Activity</h3>
              <p>CloudTrail security activity</p>
            </div>

            <span className="live-badge">
              LIVE
            </span>

          </div>

          <div className="chart-placeholder">

            <div className="chart-grid">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="activity-line">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>

            <small>
              Event activity visualization
            </small>

          </div>

        </div>

        <div className="dashboard-card security-posture">

          <div className="card-header">

            <div>
              <h3>Security Posture</h3>
              <p>Current environment status</p>
            </div>

          </div>

          <div className="posture-score">

            {criticalRisk > 0
              ? 60
              : highRisk > 0
              ? 75
              : suspiciousEvents > 0
              ? 90
              : 100}

          </div>

          <div className="posture-label">
            Security Score
          </div>

          <div className="posture-status">
            <span></span>

            {criticalRisk > 0
              ? "Critical risk detected"
              : highRisk > 0
              ? "High risk detected"
              : suspiciousEvents > 0
              ? "Suspicious activity detected"
              : "Environment Secure"}

          </div>

        </div>

      </div>

      {/* RISK DISTRIBUTION + SYSTEM HEALTH */}
      <div className="overview-grid">

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>Risk Distribution</h3>
              <p>Events by severity</p>
            </div>

          </div>

          <div className="risk-list">

            <div>
              <span className="risk-name critical">
                Critical
              </span>

              <strong>
                {criticalRisk}
              </strong>
            </div>

            <div>
              <span className="risk-name high">
                High
              </span>

              <strong>
                {highRisk}
              </strong>
            </div>

            <div>
              <span className="risk-name medium">
                Medium
              </span>

              <strong>
                {suspiciousEvents > highRisk + criticalRisk
                  ? suspiciousEvents - highRisk - criticalRisk
                  : 0}
              </strong>
            </div>

            <div>
              <span className="risk-name low">
                Low
              </span>

              <strong>
                {lowRisk}
              </strong>
            </div>

          </div>

        </div>

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>System Health</h3>
              <p>Security pipeline status</p>
            </div>

          </div>

          <div className="health-list">

            {[
              "CloudTrail Collector",
              "Event Normalizer",
              "Detection Engine",
              "Risk Engine",
              "Database",
              "FastAPI",
            ].map((service) => (

              <div
                className="health-row"
                key={service}
              >

                <span>
                  {service}
                </span>

                <strong>
                  <i></i>
                  Operational
                </strong>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* RECENT EVENTS */}
      <div className="dashboard-card recent-events">

        <div className="card-header">

          <div>
            <h3>Recent Security Events</h3>

            <p>
              Latest activity detected in your AWS environment
            </p>
          </div>

          <button>
            View All →
          </button>

        </div>

        {loading ? (

          <div className="events-message">
            Loading security events...
          </div>

        ) : recentEvents.length === 0 ? (

          <div className="events-message">
            No events available
          </div>

        ) : (

          <div className="events-table-wrapper">

            <table className="events-table">

              <thead>

                <tr>
                  <th>Event</th>
                  <th>Source</th>
                  <th>Region</th>
                  <th>Risk</th>
                  <th>Severity</th>
                </tr>

              </thead>

              <tbody>

                {recentEvents.map((event) => (

                  <tr key={event.id}>

                    <td>
                      <strong>
                        {event.event_name}
                      </strong>
                    </td>

                    <td>
                      {event.event_source || "-"}
                    </td>

                    <td>
                      {event.aws_region || "-"}
                    </td>

                    <td>
                      {event.risk_score ?? 0}
                    </td>

                    <td>

                      <span
                        className={`severity ${
                          event.severity?.toLowerCase() || "low"
                        }`}
                      >
                        {event.severity || "Low"}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Overview;