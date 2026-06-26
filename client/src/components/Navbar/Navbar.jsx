import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active" : "");

  const submitSearch = () => {
    navigate(`/products?search=${search}`);
    closeMenu();
  };

  return (
    <nav className="global-nav">
      <div className="nav-inner">
        <div
          className="nav-logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
        >
          <div className="nav-logo-mark">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path
                d="M5.5 8.5h13l-.85 9.4a2.2 2.2 0 0 1-2.2 2H8.55a2.2 2.2 0 0 1-2.2-2L5.5 8.5Z"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="m12 11.4.62 1.63 1.63.62-1.63.62L12 16.5l-.62-1.63-1.63-.62 1.63-.62L12 11.4Z"
                fill="#fff"
              />
            </svg>
          </div>
          Shopwise<span className="nav-logo-ai">AI</span>
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
                submitSearch();
              }
            }}
          />
        </div>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={"nav-toggle-bar" + (menuOpen ? " open" : "")} />
          <span className={"nav-toggle-bar" + (menuOpen ? " open" : "")} />
          <span className={"nav-toggle-bar" + (menuOpen ? " open" : "")} />
        </button>

        <div className={"nav-links" + (menuOpen ? " open" : "")}>
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/products" className={linkClass} onClick={closeMenu}>
            Products
          </NavLink>

          <NavLink to="/ai-stylist" className={linkClass} onClick={closeMenu}>
            ✦ AI Stylist
          </NavLink>

          {user ? (
            <>
              {isAdmin ? (
                <NavLink to="/dashboard" className={linkClass} onClick={closeMenu}>
                  Dashboard
                </NavLink>
              ) : (
                <>
                  <NavLink to="/wishlist" className={linkClass} onClick={closeMenu}>
                    ♡ Wishlist
                  </NavLink>

                  <NavLink to="/cart" className={linkClass} onClick={closeMenu}>
                    Cart
                  </NavLink>

                  <NavLink to="/orders" className={linkClass} onClick={closeMenu}>
                    Orders
                  </NavLink>
                </>
              )}

              <div
                className="nav-avatar"
                title={user?.name || "Profile"}
                onClick={() => {
                  navigate("/profile");
                  closeMenu();
                }}
              >
                {(user?.name || "U").charAt(0).toUpperCase()}
              </div>

              <button
                className="nav-link"
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={closeMenu}>
                Login
              </NavLink>

              <NavLink to="/register" className={linkClass} onClick={closeMenu}>
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
