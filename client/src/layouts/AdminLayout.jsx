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
            <div className="nav-logo-mark">Ι</div>Admin Panel
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
