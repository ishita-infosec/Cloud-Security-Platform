import { useEffect, useState } from "react";
import { AlertTriangle, Search, ShieldAlert } from "lucide-react";

import { getEvents } from "../../services/api";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");
  const [loading, setLoading] = useState(true);

  async function loadAlerts() {
    try {
      setLoading(true);

      const events = await getEvents();

      const suspicious = events.filter(
        (event) => event.is_suspicious === true
      );

      setAlerts(suspicious);
    } catch (error) {
      console.error("Alerts error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  const filteredAlerts = alerts.filter((alert) => {

    const matchesSearch =
      alert.event_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      alert.username
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      alert.event_source
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesSeverity =
      severity === "All" ||
      alert.severity === severity;

    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="overview-page">

      <div className="page-header">

        <div>
          <h2>Security Alerts</h2>
          <p>
            Suspicious activities detected by the threat detection engine
          </p>
        </div>

        <div className="live-status">
          <span></span>
          Detection Active
        </div>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <span>Total Alerts</span>
          <strong>{alerts.length}</strong>
          <small>Detected security events</small>
        </div>

        <div className="stat-card">
          <span>Critical</span>
          <strong>
            {alerts.filter((a) => a.severity === "Critical").length}
          </strong>
          <small>Immediate attention</small>
        </div>

        <div className="stat-card">
          <span>High</span>
          <strong>
            {alerts.filter((a) => a.severity === "High").length}
          </strong>
          <small>High-risk activity</small>
        </div>

        <div className="stat-card">
          <span>Medium</span>
          <strong>
            {alerts.filter((a) => a.severity === "Medium").length}
          </strong>
          <small>Potential risk</small>
        </div>

      </div>

      <div className="dashboard-card">

        <div className="card-header">

          <div>
            <h3>Detected Alerts</h3>
            <p>
              Security-sensitive AWS activity
            </p>
          </div>

          <ShieldAlert size={20} />

        </div>

        <div className="alert-toolbar">

          <div className="search-box">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search alerts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>

        {loading ? (

          <div className="events-message">
            Loading alerts...
          </div>

        ) : filteredAlerts.length === 0 ? (

          <div className="events-message">
            <AlertTriangle size={18} />
            No alerts found
          </div>

        ) : (

          <div className="events-table-wrapper">

            <table className="events-table">

              <thead>

                <tr>
                  <th>Event</th>
                  <th>Source</th>
                  <th>User</th>
                  <th>Risk Score</th>
                  <th>Severity</th>
                  <th>Reason</th>
                </tr>

              </thead>

              <tbody>

                {filteredAlerts.map((alert) => (

                  <tr key={alert.id}>

                    <td>
                      <strong>
                        {alert.event_name}
                      </strong>
                    </td>

                    <td>
                      {alert.event_source || "-"}
                    </td>

                    <td>
                      {alert.username || "-"}
                    </td>

                    <td>
                      <strong>
                        {alert.risk_score}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`severity ${
                          alert.severity?.toLowerCase()
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </td>

                    <td>
                      {alert.detection_reason || "-"}
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

export default Alerts;