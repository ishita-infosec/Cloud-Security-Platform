import { Bell, Moon, Sun, RefreshCw } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <div>
        <h1>Security Overview</h1>
        <p>Monitor AWS security activity and detected threats</p>
      </div>

      <div className="topbar-actions">

        <button className="icon-button" title="Refresh">
          <RefreshCw size={18} />
        </button>

        <button className="icon-button notification-button" title="Notifications">
          <Bell size={18} />
          <span className="notification-dot"></span>
        </button>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <div className="user-profile">
          <div className="avatar">IS</div>

          <div>
            <strong>Security Admin</strong>
            <small>AWS Environment</small>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Topbar;