import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="nav-logo" style={{ marginBottom: "12px" }}>
              <div className="nav-logo-mark">Ι</div>
              Intelligent
            </div>
            <p className="footer-brand-desc">
              India's most advanced ecommerce experience — combining curated
              premium products with AI-powered personal shopping.
            </p>
            <div className="footer-socials mt-24">
              <div className="footer-social">𝕏</div>
              <div className="footer-social">in</div>
              <div className="footer-social">f</div>
              <div className="footer-social">▶</div>
            </div>
          </div>
          <div>
            <div className="footer-heading">Shop</div>
            <div className="footer-links">
              <Link to="/products">All Products</Link>
              <Link to="/products">Laptops</Link>
              <Link to="/products">Smartphones</Link>
              <Link to="/products">Audio</Link>
              <Link to="/products">Gaming</Link>
            </div>
          </div>
          <div>
            <div className="footer-heading">Account</div>
            <div className="footer-links">
              <Link to="/profile">My Profile</Link>
              <Link to="/orders">My Orders</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/ai-stylist">AI Stylist</Link>
            </div>
          </div>
          <div>
            <div className="footer-heading">Support</div>
            <div className="footer-links">
              <a href="#">Help Centre</a>
              <a href="#">Returns</a>
              <a href="#">Track Order</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Intelligent Commerce Pvt. Ltd. All rights reserved.</p>
          <p>Made with ♥ for India</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
