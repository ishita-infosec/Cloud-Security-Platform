import { useEffect, useState } from "react";
import {
  ShieldAlert,
  Search,
  RefreshCw,
  Clock,
  Activity,
} from "lucide-react";

import { getEvents } from "../../services/api";

function Incidents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadIncidents() {
    try {
      setLoading(true);

      const data = await getEvents();

      const suspiciousEvents = Array.isArray(data)
        ? data.filter((event) => event.is_suspicious === true)
        : [];

      setEvents(suspiciousEvents);
    } catch (error) {
      console.error("Incidents error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    return (
      String(event.event_name || "")
        .toLowerCase()
        .includes(searchText) ||
      String(event.event_source || "")
        .toLowerCase()
        .includes(searchText) ||
      String(event.username || "")
        .toLowerCase()
        .includes(searchText) ||
      String(event.severity || "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  const criticalCount = events.filter(
    (event) => event.severity === "Critical"
  ).length;

  const highCount = events.filter(
    (event) => event.severity === "High"
  ).length;

  const mediumCount = events.filter(
    (event) => event.severity === "Medium"
  ).length;

  const totalRisk = events.reduce(
    (total, event) => total + Number(event.risk_score || 0),
    0
  );

  const incidentRisk = Math.min(totalRisk, 100);

  let incidentSeverity = "Low";

  if (incidentRisk >= 81) {
    incidentSeverity = "Critical";
  } else if (incidentRisk >= 61) {
    incidentSeverity = "High";
  } else if (incidentRisk >= 31) {
    incidentSeverity = "Medium";
  }

  return (
    <div className="overview-page">

      {/* HEADER */}

      <div className="page-header">
        <div>
          <h2>Security Incidents</h2>

          <p>
            Correlated suspicious activity identified by the monitoring
            pipeline
          </p>
        </div>

        <div className="live-status">
          <span></span>
          Correlation Active
        </div>
      </div>


      {/* SUMMARY */}

      <div className="stats-grid">

        <div className="stat-card">
          <span>Open Incidents</span>

          <strong>
            {loading ? "..." : events.length > 0 ? 1 : 0}
          </strong>

          <small>
            Suspicious activity groups
          </small>
        </div>


        <div className="stat-card">
          <span>Critical</span>

          <strong>
            {loading ? "..." : criticalCount}
          </strong>

          <small>
            Critical security events
          </small>
        </div>


        <div className="stat-card">
          <span>High Risk</span>

          <strong>
            {loading ? "..." : highCount}
          </strong>

          <small>
            High severity activity
          </small>
        </div>


        <div className="stat-card">
          <span>Incident Risk</span>

          <strong>
            {loading ? "..." : incidentRisk}
          </strong>

          <small>
            Calculated risk score
          </small>
        </div>

      </div>


      {/* INCIDENT OVERVIEW */}

      <div className="overview-grid">

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>Incident Overview</h3>

              <p>
                Current correlated security activity
              </p>
            </div>

            <ShieldAlert size={20} />

          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "25px",
            }}
          >

            <div>
              <small
                style={{
                  color: "var(--text-muted)",
                  fontSize: "10px",
                }}
              >
                INCIDENT STATUS
              </small>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {events.length > 0
                  ? "Investigating"
                  : "No Active Incident"}
              </div>
            </div>


            <div>
              <small
                style={{
                  color: "var(--text-muted)",
                  fontSize: "10px",
                }}
              >
                SEVERITY
              </small>

              <div style={{ marginTop: "8px" }}>
                <span
                  className={`severity ${incidentSeverity.toLowerCase()}`}
                >
                  {incidentSeverity}
                </span>
              </div>
            </div>


            <div>
              <small
                style={{
                  color: "var(--text-muted)",
                  fontSize: "10px",
                }}
              >
                RELATED EVENTS
              </small>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {events.length}
              </div>
            </div>


            <div>
              <small
                style={{
                  color: "var(--text-muted)",
                  fontSize: "10px",
                }}
              >
                RISK SCORE
              </small>

              <div
                style={{
                  marginTop: "8px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                {incidentRisk}/100
              </div>
            </div>

          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>Incident Statistics</h3>

              <p>
                Severity breakdown
              </p>
            </div>

            <Activity size={20} />

          </div>


          <div className="risk-list">

            <div>
              <span className="risk-name critical">
                Critical
              </span>

              <strong>
                {criticalCount}
              </strong>
            </div>


            <div>
              <span className="risk-name high">
                High
              </span>

              <strong>
                {highCount}
              </strong>
            </div>


            <div>
              <span className="risk-name medium">
                Medium
              </span>

              <strong>
                {mediumCount}
              </strong>
            </div>


            <div>
              <span className="risk-name low">
                Low
              </span>

              <strong>
                {events.filter(
                  (event) => event.severity === "Low"
                ).length}
              </strong>
            </div>

          </div>

        </div>

      </div>


      {/* INCIDENT TIMELINE */}

      <div className="dashboard-card">

        <div className="card-header">

          <div>
            <h3>Incident Timeline</h3>

            <p>
              Suspicious events contributing to the incident
            </p>
          </div>

          <button
            className="events-refresh-button"
            onClick={loadIncidents}
          >
            <RefreshCw size={15} />
            Refresh
          </button>

        </div>


        <div className="alert-toolbar">

          <div className="search-box">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search incident activity..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        {loading ? (

          <div className="events-message">
            Loading incident activity...
          </div>

        ) : filteredEvents.length === 0 ? (

          <div className="events-message">
            No active incidents found.
          </div>

        ) : (

          <div className="events-table-wrapper">

            <table className="events-table">

              <thead>

                <tr>
                  <th>Time</th>
                  <th>Event</th>
                  <th>Source</th>
                  <th>User</th>
                  <th>Risk</th>
                  <th>Severity</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                {filteredEvents.map((event) => (

                  <tr key={event.id}>

                    <td>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Clock size={13} />

                        {event.event_time
                          ? new Date(
                              event.event_time
                            ).toLocaleString()
                          : "-"}
                      </span>
                    </td>


                    <td>
                      <strong>
                        {event.event_name}
                      </strong>
                    </td>


                    <td>
                      {event.event_source || "-"}
                    </td>


                    <td>
                      {event.username || "-"}
                    </td>


                    <td>
                      <strong>
                        {event.risk_score || 0}
                      </strong>
                    </td>


                    <td>
                      <span
                        className={`severity ${
                          (
                            event.severity ||
                            "Low"
                          ).toLowerCase()
                        }`}
                      >
                        {event.severity || "Low"}
                      </span>
                    </td>


                    <td>
                      <span className="severity medium">
                        Investigating
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

export default Incidents;