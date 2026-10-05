import {
  LayoutDashboard,
  Bell,
  ShieldAlert,
  Activity,
  BarChart3,
  Cloud,
  Crosshair,
  Server,
  Settings,
} from "lucide-react";

const menuSections = [
  {
    title: "MONITORING",
    items: [
      {
        label: "Overview",
        icon: LayoutDashboard,
      },
      {
        label: "Alerts",
        icon: Bell,
      },
      {
        label: "Incidents",
        icon: ShieldAlert,
      },
      {
        label: "Events",
        icon: Activity,
      },
    ],
  },

  {
    title: "SECURITY",
    items: [
      {
        label: "Risk Analysis",
        icon: BarChart3,
      },
      {
        label: "AWS Assets",
        icon: Cloud,
      },
      {
        label: "Threat Detection",
        icon: Crosshair,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        label: "System Health",
        icon: Server,
      },
      {
        label: "Settings",
        icon: Settings,
      },
    ],
  },
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">

      {/* BRAND */}

      <div className="brand">

        <div className="brand-logo">
          CS
        </div>

        <div>
          <h2>CloudShield</h2>
          <span>Security Platform</span>
        </div>

      </div>


      {/* NAVIGATION */}

      <nav className="sidebar-nav">

        {menuSections.map((section) => (

          <div
            className="menu-section"
            key={section.title}
          >

            <p className="menu-title">
              {section.title}
            </p>


            {section.items.map(
              ({ label, icon: Icon }) => (

                <button
                  key={label}
                  type="button"
                  className={`menu-item ${
                    activePage === label
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActivePage(label)
                  }
                >

                  <Icon size={17} />

                  <span>
                    {label}
                  </span>

                </button>

              )
            )}

          </div>

        ))}

      </nav>


      {/* SYSTEM STATUS */}

      <div className="monitor-status">

        <span className="status-indicator"></span>

        <div>

          <strong>
            System Online
          </strong>

          <small>
            AWS monitoring active
          </small>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;