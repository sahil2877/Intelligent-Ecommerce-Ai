import { Link } from "react-router-dom";

function Navbar() {
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

      <div className="flex gap-8 text-lg">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart">Cart</Link>

        <Link to="/wishlist">Wishlist</Link>

        <Link to="/orders">
  Orders
</Link>

        <Link to="/login">
  Login
</Link>

<Link to="/register">
  Register
</Link>
      </div>
      
    </nav>
  );
}

export default Navbar;
