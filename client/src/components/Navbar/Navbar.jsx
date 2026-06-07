import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center px-8 py-6">
      <h1 className="text-3xl font-bold">Nexora</h1>

      <div className="hidden md:flex">
        <input
          type="text"
          placeholder="Search products..."
          className="
    w-80
    px-4
    py-2
    rounded-xl
    bg-[#111827]
    border border-gray-700
    outline-none
    "
        />
      </div>

      <div className="flex gap-8 items-center">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        {user ? (
          <>
            <Link to="/cart">Cart</Link>

            <Link to="/wishlist">Wishlist</Link>

            <Link to="/orders">Orders</Link>

            <button
              onClick={handleLogout}
              className="
        bg-red-600
        px-4
        py-2
        rounded-lg
        "
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
