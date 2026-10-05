import { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  Database,
  Globe,
  ShieldCheck,
  Activity,
  RefreshCw,
} from "lucide-react";

import { getEvents } from "../../services/api";

function AWSAssets() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAssets() {
    try {
      setLoading(true);

      const data = await getEvents();

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("AWS Assets error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAssets();
  }, []);

  const services = useMemo(() => {
    const serviceMap = {};

    events.forEach((event) => {
      const source = event.event_source || "Unknown";

      serviceMap[source] = (serviceMap[source] || 0) + 1;
    });

    return Object.entries(serviceMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [events]);

  const regions = useMemo(() => {
    const regionMap = {};

    events.forEach((event) => {
      const region = event.aws_region || "Unknown";

      regionMap[region] = (regionMap[region] || 0) + 1;
    });

    return Object.entries(regionMap)
      .sort((a, b) => b[1] - a[1]);
  }, [events]);

  const suspiciousEvents = events.filter(
    (event) => event.is_suspicious === true
  ).length;

  const latestEvent = events.length > 0
    ? events[0]
    : null;

  return (
    <div className="overview-page">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h2>AWS Assets</h2>

          <p>
            Monitor AWS account resources, services and activity
          </p>
        </div>

        <div className="live-status">
          <span></span>
          AWS Monitoring Active
        </div>

      </div>


      {/* SUMMARY */}

      <div className="stats-grid">

        <div className="stat-card">

          <span>AWS Account</span>

          <strong>
            Connected
          </strong>

          <small>
            Cloud environment
          </small>

        </div>


        <div className="stat-card">

          <span>Active Region</span>

          <strong>
            {loading
              ? "..."
              : regions.length > 0
              ? regions[0][0]
              : "eu-north-1"}
          </strong>

          <small>
            CloudTrail region
          </small>

        </div>


        <div className="stat-card">

          <span>Services Observed</span>

          <strong>
            {loading ? "..." : services.length}
          </strong>

          <small>
            AWS services detected
          </small>

        </div>


        <div className="stat-card">

          <span>Suspicious Activity</span>

          <strong>
            {loading ? "..." : suspiciousEvents}
          </strong>

          <small>
            Security-sensitive events
          </small>

        </div>

      </div>


      {/* CLOUD ENVIRONMENT */}

      <div className="overview-grid">

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>Cloud Environment</h3>

              <p>
                Current AWS monitoring configuration
              </p>
            </div>

            <Cloud size={20} />

          </div>


          <div className="health-list">

            <div className="health-row">

              <span>AWS Account</span>

              <strong>
                <i></i>
                Connected
              </strong>

            </div>


            <div className="health-row">

              <span>CloudTrail</span>

              <strong>
                <i></i>
                Logging Active
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

              <span>Detection Engine</span>

              <strong>
                <i></i>
                Operational
              </strong>

            </div>


            <div className="health-row">

              <span>Risk Engine</span>

              <strong>
                <i></i>
                Operational
              </strong>

            </div>

          </div>

        </div>


        {/* REGION */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>AWS Regions</h3>

              <p>
                Regions present in collected events
              </p>
            </div>

            <Globe size={20} />

          </div>


          {loading ? (

            <div className="events-message">
              Loading regions...
            </div>

          ) : regions.length === 0 ? (

            <div className="events-message">
              No region data available.
            </div>

          ) : (

            <div className="risk-list">

              {regions.map(([region, count]) => (

                <div key={region}>

                  <span className="risk-name low">
                    {region}
                  </span>

                  <strong>
                    {count} events
                  </strong>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* SERVICES */}

      <div className="dashboard-card">

        <div className="card-header">

          <div>

            <h3>Observed AWS Services</h3>

            <p>
              Services identified from CloudTrail activity
            </p>

          </div>

          <Database size={20} />

        </div>


        {loading ? (

          <div className="events-message">
            Loading AWS services...
          </div>

        ) : services.length === 0 ? (

          <div className="events-message">
            No AWS service data available.
          </div>

        ) : (

          <div className="events-table-wrapper">

            <table className="events-table">

              <thead>

                <tr>
                  <th>Service</th>
                  <th>Events</th>
                  <th>Monitoring</th>
                </tr>

              </thead>


              <tbody>

                {services.map(([service, count]) => (

                  <tr key={service}>

                    <td>
                      <strong>
                        {service}
                      </strong>
                    </td>

                    <td>
                      {count}
                    </td>

                    <td>

                      <span className="severity low">
                        Monitored
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* LATEST RESOURCE ACTIVITY */}

      <div className="dashboard-card">

        <div className="card-header">

          <div>

            <h3>Latest AWS Activity</h3>

            <p>
              Most recent activity observed by CloudTrail
            </p>

          </div>

          <Activity size={20} />

        </div>


        {latestEvent ? (

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, 1fr)",
              gap: "15px",
              marginTop: "22px",
            }}
          >

            <div>

              <small
                style={{
                  color: "var(--text-muted)",
                  fontSize: "9px",
                }}
              >
                EVENT
              </small>

              <div
                style={{
                  marginTop: "7px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {latestEvent.event_name || "-"}
              </div>

            </div>


            <div>

              <small
                style={{
                  color: "var(--text-muted)",
                  fontSize: "9px",
                }}
              >
                SERVICE
              </small>

              <div
                style={{
                  marginTop: "7px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {latestEvent.event_source || "-"}
              </div>

            </div>


            <div>

              <small
                style={{
                  color: "var(--text-muted)",
                  fontSize: "9px",
                }}
              >
                REGION
              </small>

              <div
                style={{
                  marginTop: "7px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {latestEvent.aws_region || "-"}
              </div>

            </div>


            <div>

              <small
                style={{
                  color: "var(--text-muted)",
                  fontSize: "9px",
                }}
              >
                STATUS
              </small>

              <div
                style={{
                  marginTop: "7px",
                }}
              >

                <span className="severity low">
                  Observed
                </span>

              </div>

            </div>

          </div>

        ) : (

          <div className="events-message">
            No recent AWS activity.
          </div>

        )}

      </div>


      {/* REFRESH */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "15px",
        }}
      >

        <button
          className="events-refresh-button"
          onClick={loadAssets}
        >
          <RefreshCw size={15} />
          Refresh Assets
        </button>

      </div>

    </div>
  );
}

export default AWSAssets;