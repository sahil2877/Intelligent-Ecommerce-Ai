import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="container section-sm text-center text-muted">
        Loading...
      </div>
    );
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="container section-sm">
      <div className="profile-layout">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-avatar-section">
            <div className="profile-avatar-lg">
              {(user.name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-email">{user.email}</div>
            <div style={{ marginTop: "10px" }}>
              <span className="badge badge-primary">
                {isAdmin ? "Administrator" : "Member"}
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="profile-nav-link active">
            <span className="profile-nav-icon">👤</span> Personal Info
          </div>
          {isAdmin ? (
            <div
              className="profile-nav-link"
              onClick={() => navigate("/dashboard")}
            >
              <span className="profile-nav-icon">📊</span> Dashboard
            </div>
          ) : (
            <>
              <div
                className="profile-nav-link"
                onClick={() => navigate("/orders")}
              >
                <span className="profile-nav-icon">📦</span> My Orders
              </div>
              <div
                className="profile-nav-link"
                onClick={() => navigate("/wishlist")}
              >
                <span className="profile-nav-icon">♡</span> Wishlist
              </div>
            </>
          )}
          <div className="divider"></div>
          <div
            className="profile-nav-link"
            style={{ color: "var(--rose)" }}
            onClick={handleLogout}
          >
            <span className="profile-nav-icon">→</span> Sign Out
          </div>
        </div>

        {/* Main Content */}
        <div>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "28px",
            }}
          >
            <div className="flex justify-between items-center mb-24">
              <div className="heading">Personal Information</div>
            </div>
            <div className="info-grid">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input className="form-input" value={user.name} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" value={user.email} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input className="form-input" value={user.role} readOnly />
              </div>
              <div className="form-group">
                <label className="form-label">Joined</label>
                <input
                  className="form-input"
                  value={new Date(user.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
