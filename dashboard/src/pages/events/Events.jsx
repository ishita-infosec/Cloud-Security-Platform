import { useEffect, useState } from "react";
import {
  Activity,
  Search,
  RefreshCw,
} from "lucide-react";

import { getEvents } from "../../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    try {
      setLoading(true);

      const data = await getEvents();

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Events error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      String(event.event_name || "")
        .toLowerCase()
        .includes(searchText) ||
      String(event.event_source || "")
        .toLowerCase()
        .includes(searchText) ||
      String(event.username || "")
        .toLowerCase()
        .includes(searchText) ||
      String(event.aws_region || "")
        .toLowerCase()
        .includes(searchText);

    const matchesSeverity =
      severity === "All" ||
      event.severity === severity;

    return matchesSearch && matchesSeverity;
  });

  const suspiciousCount = events.filter(
    (event) => event.is_suspicious === true
  ).length;

  const highRiskCount = events.filter(
    (event) => event.severity === "High"
  ).length;

  const criticalCount = events.filter(
    (event) => event.severity === "Critical"
  ).length;

  return (
    <div className="overview-page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <h2>Events Explorer</h2>

          <p>
            Explore and analyze AWS CloudTrail security activity
          </p>
        </div>

        <div className="live-status">
          <span></span>
          CloudTrail Monitoring
        </div>

      </div>


      {/* SUMMARY */}

      <div className="stats-grid">

        <div className="stat-card">
          <span>Total Events</span>

          <strong>
            {loading ? "..." : events.length}
          </strong>

          <small>
            Events collected
          </small>
        </div>


        <div className="stat-card">
          <span>Suspicious</span>

          <strong>
            {loading ? "..." : suspiciousCount}
          </strong>

          <small>
            Security-sensitive activity
          </small>
        </div>


        <div className="stat-card">
          <span>High Risk</span>

          <strong>
            {loading ? "..." : highRiskCount}
          </strong>

          <small>
            High severity events
          </small>
        </div>


        <div className="stat-card">
          <span>Critical</span>

          <strong>
            {loading ? "..." : criticalCount}
          </strong>

          <small>
            Critical events
          </small>
        </div>

      </div>


      {/* MAIN EVENTS CARD */}

      <div className="dashboard-card">

        <div className="card-header">

          <div>

            <h3>
              CloudTrail Events
            </h3>

            <p>
              All events processed by the monitoring pipeline
            </p>

          </div>

          <Activity size={20} />

        </div>


        {/* FILTERS */}

        <div className="alert-toolbar">

          <div className="search-box">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search event, source, user or region..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <select
            value={severity}
            onChange={(e) =>
              setSeverity(e.target.value)
            }
          >

            <option value="All">
              All Severities
            </option>

            <option value="Critical">
              Critical
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>


          <button
            className="events-refresh-button"
            onClick={loadEvents}
            title="Refresh events"
          >

            <RefreshCw size={15} />

            Refresh

          </button>

        </div>


        {/* EVENTS */}

        {loading ? (

          <div className="events-message">
            Loading CloudTrail events...
          </div>

        ) : filteredEvents.length === 0 ? (

          <div className="events-message">
            No events found.
          </div>

        ) : (

          <div className="events-table-wrapper">

            <table className="events-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Event</th>

                  <th>Source</th>

                  <th>User</th>

                  <th>Region</th>

                  <th>Risk</th>

                  <th>Severity</th>

                </tr>

              </thead>


              <tbody>

                {filteredEvents.map((event) => (

                  <tr key={event.id}>

                    <td>
                      #{event.id}
                    </td>


                    <td>
                      <strong>
                        {event.event_name || "-"}
                      </strong>
                    </td>


                    <td>
                      {event.event_source || "-"}
                    </td>


                    <td>
                      {event.username || "-"}
                    </td>


                    <td>
                      {event.aws_region || "-"}
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

export default Events;