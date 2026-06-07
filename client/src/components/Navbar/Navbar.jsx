import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-6">

      <Link to="/">
        <h1 className="text-3xl font-bold">
          Nexora
        </h1>
      </Link>

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