import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow">

      <Link to="/">
        <h1 className="text-2xl font-bold">
          Nexora
        </h1>
      </Link>

      <div className="flex gap-5">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart
        </Link>

        <Link to="/wishlist">
          Wishlist
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;