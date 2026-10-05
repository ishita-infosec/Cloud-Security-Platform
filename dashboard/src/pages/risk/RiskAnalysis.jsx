import { useEffect, useState } from "react";
import {
  BarChart3,
  RefreshCw,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

import { getEvents } from "../../services/api";

function RiskAnalysis() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadRiskData() {
    try {
      setLoading(true);

      const data = await getEvents();

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Risk Analysis error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRiskData();
  }, []);

  const critical = events.filter(
    (event) => event.severity === "Critical"
  );

  const high = events.filter(
    (event) => event.severity === "High"
  );

  const medium = events.filter(
    (event) => event.severity === "Medium"
  );

  const low = events.filter(
    (event) => event.severity === "Low"
  );

  const totalRisk = events.reduce(
    (sum, event) => sum + Number(event.risk_score || 0),
    0
  );

  const highestRisk =
    events.length > 0
      ? Math.max(
          ...events.map((event) =>
            Number(event.risk_score || 0)
          )
        )
      : 0;

  const suspiciousEvents = events.filter(
    (event) => event.is_suspicious === true
  );

  const averageRisk =
    events.length > 0
      ? Math.round(totalRisk / events.length)
      : 0;

  const riskLevel =
    highestRisk >= 81
      ? "Critical"
      : highestRisk >= 61
      ? "High"
      : highestRisk >= 31
      ? "Medium"
      : "Low";

  const riskPercent = (count) => {
    if (events.length === 0) return 0;

    return Math.round((count / events.length) * 100);
  };

  const riskyActivities = [...suspiciousEvents]
    .sort(
      (a, b) =>
        Number(b.risk_score || 0) -
        Number(a.risk_score || 0)
    )
    .slice(0, 5);

  return (
    <div className="overview-page">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h2>Risk Analysis</h2>

          <p>
            Analyze security risk across monitored AWS activity
          </p>
        </div>

        <div className="live-status">
          <span></span>
          Risk Engine Active
        </div>

      </div>


      {/* SUMMARY */}

      <div className="stats-grid">

        <div className="stat-card">
          <span>Total Risk Score</span>

          <strong>
            {loading ? "..." : totalRisk}
          </strong>

          <small>
            Combined event risk
          </small>
        </div>


        <div className="stat-card">
          <span>Highest Risk</span>

          <strong>
            {loading ? "..." : highestRisk}
          </strong>

          <small>
            Maximum event score
          </small>
        </div>


        <div className="stat-card">
          <span>Average Risk</span>

          <strong>
            {loading ? "..." : averageRisk}
          </strong>

          <small>
            Average event score
          </small>
        </div>


        <div className="stat-card">
          <span>Risk Level</span>

          <strong>
            {loading ? "..." : riskLevel}
          </strong>

          <small>
            Current environment
          </small>
        </div>

      </div>


      {/* RISK DISTRIBUTION */}

      <div className="overview-grid">

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>Risk Distribution</h3>

              <p>
                Events grouped by severity
              </p>
            </div>

            <BarChart3 size={20} />

          </div>


          <div style={{ marginTop: "25px" }}>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "7px",
                fontSize: "11px",
              }}
            >
              <span>Critical</span>
              <strong>
                {critical.length} ({riskPercent(critical.length)}%)
              </strong>
            </div>

            <div className="risk-progress">
              <div
                className="risk-progress-critical"
                style={{
                  width: `${riskPercent(critical.length)}%`,
                }}
              ></div>
            </div>


            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
                marginBottom: "7px",
                fontSize: "11px",
              }}
            >
              <span>High</span>
              <strong>
                {high.length} ({riskPercent(high.length)}%)
              </strong>
            </div>

            <div className="risk-progress">
              <div
                className="risk-progress-high"
                style={{
                  width: `${riskPercent(high.length)}%`,
                }}
              ></div>
            </div>


            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
                marginBottom: "7px",
                fontSize: "11px",
              }}
            >
              <span>Medium</span>
              <strong>
                {medium.length} ({riskPercent(medium.length)}%)
              </strong>
            </div>

            <div className="risk-progress">
              <div
                className="risk-progress-medium"
                style={{
                  width: `${riskPercent(medium.length)}%`,
                }}
              ></div>
            </div>


            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "18px",
                marginBottom: "7px",
                fontSize: "11px",
              }}
            >
              <span>Low</span>
              <strong>
                {low.length} ({riskPercent(low.length)}%)
              </strong>
            </div>

            <div className="risk-progress">
              <div
                className="risk-progress-low"
                style={{
                  width: `${riskPercent(low.length)}%`,
                }}
              ></div>
            </div>

          </div>

        </div>


        {/* SECURITY POSTURE */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h3>Risk Posture</h3>

              <p>
                Current security exposure
              </p>
            </div>

            <ShieldAlert size={20} />

          </div>


          <div
            style={{
              textAlign: "center",
              marginTop: "28px",
            }}
          >

            <div
              style={{
                fontSize: "48px",
                fontWeight: "700",
              }}
            >
              {highestRisk}
            </div>

            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "10px",
              }}
            >
              Highest Risk Score
            </div>


            <div style={{ marginTop: "20px" }}>

              <span
                className={`severity ${riskLevel.toLowerCase()}`}
              >
                {riskLevel} Risk
              </span>

            </div>


            <p
              style={{
                marginTop: "18px",
                color: "var(--text-secondary)",
                fontSize: "11px",
                lineHeight: "1.6",
              }}
            >
              {highestRisk >= 81
                ? "Critical activity requires immediate investigation."
                : highestRisk >= 61
                ? "High-risk activity requires investigation."
                : highestRisk >= 31
                ? "Medium-risk activity should be reviewed."
                : "No significant risk detected."}
            </p>

          </div>

        </div>

      </div>


      {/* TOP RISKY ACTIVITIES */}

      <div className="dashboard-card">

        <div className="card-header">

          <div>
            <h3>Top Risky Activities</h3>

            <p>
              Highest-scoring security events
            </p>
          </div>

          <TrendingUp size={20} />

        </div>


        {loading ? (

          <div className="events-message">
            Loading risk data...
          </div>

        ) : riskyActivities.length === 0 ? (

          <div className="events-message">
            No risky activities detected.
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

                {riskyActivities.map((event) => (

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
                      {event.detection_reason || "-"}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* RISK SCORING */}

      <div className="dashboard-card">

        <div className="card-header">

          <div>
            <h3>Risk Scoring Model</h3>

            <p>
              Current rule-based risk classification
            </p>
          </div>

          <button
            className="events-refresh-button"
            onClick={loadRiskData}
          >
            <RefreshCw size={15} />
            Refresh
          </button>

        </div>


        <div className="risk-list">

          <div>
            <span className="risk-name low">
              Low
            </span>

            <strong>
              0 - 30
            </strong>
          </div>


          <div>
            <span className="risk-name medium">
              Medium
            </span>

            <strong>
              31 - 60
            </strong>
          </div>


          <div>
            <span className="risk-name high">
              High
            </span>

            <strong>
              61 - 80
            </strong>
          </div>


          <div>
            <span className="risk-name critical">
              Critical
            </span>

            <strong>
              81 - 100
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default RiskAnalysis;