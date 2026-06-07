import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center px-8 py-6">
      <h1 className="text-3xl font-bold">Nexora</h1>

      <div className="flex gap-8 text-lg">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart">Cart</Link>

        <Link to="/wishlist">Wishlist</Link>
      </div>
    </nav>
  );
}

export default Navbar;
