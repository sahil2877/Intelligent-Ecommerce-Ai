import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="nav-logo" style={{ marginBottom: "12px" }}>
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
              <Link to="/products">Men's Clothing</Link>
              <Link to="/products">Women's Clothing</Link>
              <Link to="/products">Footwear</Link>
              <Link to="/products">Electronics</Link>
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
          <p>© 2025 Shopwise AI Commerce Pvt. Ltd. All rights reserved.</p>
          <p>Made with ♥ for India</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
