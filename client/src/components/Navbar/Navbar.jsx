import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  return (
    <nav className="global-nav">
      <div className="nav-inner">
        <div
          className="nav-logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <div className="nav-logo-mark">Ι</div>
          Intelligent
        </div>

        <div className="nav-search">
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search products, brands, categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/products?search=${search}`);
              }
            }}
          />
        </div>

        <div className="nav-links">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>

          <NavLink to="/ai-stylist" className={linkClass}>
            ✦ AI Stylist
          </NavLink>

          {user ? (
            <>
              {isAdmin ? (
                <NavLink to="/dashboard" className={linkClass}>
                  Dashboard
                </NavLink>
              ) : (
                <>
                  <NavLink to="/wishlist" className={linkClass}>
                    ♡ Wishlist
                  </NavLink>

                  <NavLink to="/cart" className={linkClass}>
                    Cart
                  </NavLink>

                  <NavLink to="/orders" className={linkClass}>
                    Orders
                  </NavLink>
                </>
              )}

              <div
                className="nav-avatar"
                title={user?.name || "Profile"}
                onClick={() => navigate("/profile")}
              >
                {(user?.name || "U").charAt(0).toUpperCase()}
              </div>

              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
