import { NavLink } from "react-router-dom";
import { Home, Search, ShoppingBag, User } from "lucide-react";

// Mobile-only bottom navigation (shown < 640px via CSS).
// Home · Search · Cart · Profile — the four primary destinations.
function MobileBottomNav() {
  const user = JSON.parse(localStorage.getItem("user"));

  const cls = ({ isActive }) =>
    "bottom-nav-link" + (isActive ? " active" : "");

  return (
    <nav className="bottom-nav" aria-label="Primary">
      <div className="bottom-nav-inner">
        <NavLink to="/" end className={cls}>
          <Home size={22} strokeWidth={1.9} />
          Home
        </NavLink>
        <NavLink to="/products" className={cls}>
          <Search size={22} strokeWidth={1.9} />
          Search
        </NavLink>
        <NavLink to="/cart" className={cls}>
          <ShoppingBag size={22} strokeWidth={1.9} />
          Cart
        </NavLink>
        <NavLink to={user ? "/profile" : "/login"} className={cls}>
          <User size={22} strokeWidth={1.9} />
          Profile
        </NavLink>
      </div>
    </nav>
  );
}

export default MobileBottomNav;
