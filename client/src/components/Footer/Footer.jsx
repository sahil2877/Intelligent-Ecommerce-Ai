import { Link } from "react-router-dom";
import { Sparkles, AtSign, Camera, Globe, Video, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="nav-logo">
              <div className="nav-logo-mark">
                <Sparkles size={18} strokeWidth={2.2} />
              </div>
              Shopwise<span className="nav-logo-ai">AI</span>
            </div>
            <p className="footer-brand-desc">
              India's most thoughtful shopping experience — premium curation
              meets an AI personal shopper that actually understands what you
              want.
            </p>
            <div className="footer-socials mt-24">
              <a className="footer-social" href="#" aria-label="Twitter / X">
                <AtSign size={18} strokeWidth={1.8} />
              </a>
              <a className="footer-social" href="#" aria-label="Instagram">
                <Camera size={18} strokeWidth={1.8} />
              </a>
              <a className="footer-social" href="#" aria-label="Website">
                <Globe size={18} strokeWidth={1.8} />
              </a>
              <a className="footer-social" href="#" aria-label="YouTube">
                <Video size={18} strokeWidth={1.8} />
              </a>
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
          <p>
            Made with{" "}
            <span className="heart">
              <Heart size={13} fill="currentColor" strokeWidth={0} />
            </span>{" "}
            in India
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
