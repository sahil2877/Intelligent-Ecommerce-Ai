import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import api from "../../api/axios";
import {
  Search,
  Heart,
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  Home,
  Package,
  LayoutDashboard,
  ClipboardList,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  // sticky header gains a stronger blur/shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore network errors — clear the client session regardless.
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const closeMenu = () => setMenuOpen(false);
  const linkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");
  const drawerLinkClass = ({ isActive }) =>
    "nav-drawer-link" + (isActive ? " active" : "");

  const submitSearch = () => {
    navigate(`/products?search=${search}`);
    closeMenu();
  };

  return (
    <nav className={"global-nav" + (scrolled ? " scrolled" : "")}>
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
            <Sparkles size={18} strokeWidth={2.2} />
          </div>
          Shopwise<span className="nav-logo-ai">AI</span>
        </div>

        <div className="nav-search">
          <Search size={16} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search products, brands, categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitSearch()}
          />
        </div>

        <div className="nav-right">
          {/* desktop text links */}
          <div className="nav-links">
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={linkClass}>
              Shop
            </NavLink>
            <NavLink to="/ai-stylist" className={linkClass}>
              <Sparkles size={15} /> AI Stylist
            </NavLink>
            {user && !isAdmin && (
              <NavLink to="/orders" className={linkClass}>
                Orders
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            )}
          </div>

          {/* always-visible quick icons (every breakpoint) */}
          {!isAdmin && (
            <>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  "nav-icon-btn" + (isActive ? " active" : "")
                }
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.8} />
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  "nav-icon-btn" + (isActive ? " active" : "")
                }
                aria-label="Cart"
              >
                <ShoppingBag size={20} strokeWidth={1.8} />
              </NavLink>
            </>
          )}

          {/* desktop account control */}
          <div className="nav-links">
            {user ? (
              <div
                className="nav-avatar"
                title={user?.name || "Profile"}
                onClick={() => navigate("/profile")}
              >
                {(user?.name || "U").charAt(0).toUpperCase()}
              </div>
            ) : (
              <>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </>
            )}
          </div>

          {/* mobile hamburger */}
          <button
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ── slide-in mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="nav-scrim"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.aside
              className="nav-drawer"
              initial={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 0.7, 0.2, 1] }}
            >
              <div className="nav-drawer-head">
                <div className="nav-logo">
                  <div className="nav-logo-mark">
                    <Sparkles size={18} strokeWidth={2.2} />
                  </div>
                  Shopwise<span className="nav-logo-ai">AI</span>
                </div>
                <button
                  className="nav-icon-btn"
                  aria-label="Close menu"
                  onClick={closeMenu}
                >
                  <X size={22} />
                </button>
              </div>

              <div
                className="nav-search"
                style={{ display: "flex", marginBottom: 12 }}
              >
                <Search size={16} strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search products…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                />
              </div>

              <NavLink to="/" end className={drawerLinkClass} onClick={closeMenu}>
                <Home size={20} /> Home
              </NavLink>
              <NavLink
                to="/products"
                className={drawerLinkClass}
                onClick={closeMenu}
              >
                <Package size={20} /> Shop
              </NavLink>
              <NavLink
                to="/ai-stylist"
                className={drawerLinkClass}
                onClick={closeMenu}
              >
                <Sparkles size={20} /> AI Stylist
              </NavLink>

              <div className="nav-drawer-divider" />

              {user ? (
                <>
                  {isAdmin ? (
                    <NavLink
                      to="/dashboard"
                      className={drawerLinkClass}
                      onClick={closeMenu}
                    >
                      <LayoutDashboard size={20} /> Dashboard
                    </NavLink>
                  ) : (
                    <>
                      <NavLink
                        to="/wishlist"
                        className={drawerLinkClass}
                        onClick={closeMenu}
                      >
                        <Heart size={20} /> Wishlist
                      </NavLink>
                      <NavLink
                        to="/cart"
                        className={drawerLinkClass}
                        onClick={closeMenu}
                      >
                        <ShoppingBag size={20} /> Cart
                      </NavLink>
                      <NavLink
                        to="/orders"
                        className={drawerLinkClass}
                        onClick={closeMenu}
                      >
                        <ClipboardList size={20} /> Orders
                      </NavLink>
                    </>
                  )}
                  <NavLink
                    to="/profile"
                    className={drawerLinkClass}
                    onClick={closeMenu}
                  >
                    <User size={20} /> Profile
                  </NavLink>
                  <button
                    className="nav-drawer-link"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={drawerLinkClass}
                    onClick={closeMenu}
                  >
                    <LogIn size={20} /> Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={drawerLinkClass}
                    onClick={closeMenu}
                  >
                    <UserPlus size={20} /> Create account
                  </NavLink>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
