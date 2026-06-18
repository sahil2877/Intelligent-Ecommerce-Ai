import { NavLink, Navigate, useNavigate } from "react-router-dom";

const adminNav = [
  { to: "/dashboard", icon: "📊", label: "Dashboard", end: true },
  { to: "/admin/products", icon: "🏷", label: "Products Management" },
  { to: "/admin/add-product", icon: "➕", label: "Add Product" },
  { to: "/admin/categories", icon: "🗂", label: "Categories" },
  { to: "/admin/orders", icon: "📦", label: "Orders Management" },
  { to: "/profile", icon: "👤", label: "Profile" },
];

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div
          style={{
            padding: "0 12px 16px",
            borderBottom: "1px solid var(--border)",
            marginBottom: "16px",
          }}
        >
          <div
            className="nav-logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            <div className="nav-logo-mark">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M5.5 8.5h13l-.85 9.4a2.2 2.2 0 0 1-2.2 2H8.55a2.2 2.2 0 0 1-2.2-2L5.5 8.5Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                <path d="m12 11.4.62 1.63 1.63.62-1.63.62L12 16.5l-.62-1.63-1.63-.62 1.63-.62L12 11.4Z" fill="#fff" />
              </svg>
            </div>
            Shopwise<span className="nav-logo-ai">AI</span>&nbsp;Admin
          </div>
        </div>

        <div className="admin-sidebar-section">
          {adminNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                "admin-nav-link" + (isActive ? " active" : "")
              }
            >
              <span className="admin-nav-icon">{item.icon}</span> {item.label}
            </NavLink>
          ))}
        </div>

        <div className="admin-sidebar-section">
          <div
            className="admin-nav-link"
            style={{ color: "var(--rose)" }}
            onClick={handleLogout}
          >
            <span className="admin-nav-icon">→</span> Sign Out
          </div>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}

export default AdminLayout;
