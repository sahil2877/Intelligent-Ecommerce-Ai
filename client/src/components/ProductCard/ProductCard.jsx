import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Heart, ShoppingBag, ImageOff } from "lucide-react";
import api from "../../api/axios";
import Stars from "../ui/Stars";
import { viewportOnce } from "../../lib/motion";

function ProductCard({ product, initialWishlisted = false, onWishlistChange }) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [busy, setBusy] = useState(false);

  const goToProduct = () => navigate(`/products/${product._id}`);
  const rating = Number(product.averageRating || 0);

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    if (busy) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to save items");
      navigate("/login");
      return;
    }

    const next = !wishlisted;
    setWishlisted(next); // optimistic
    setBusy(true);

    try {
      if (next) {
        await api.post(
          `/wishlist/add/${product._id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
        toast.success("Saved to wishlist");
      } else {
        await api.delete(`/wishlist/remove/${product._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Removed from wishlist");
      }
      onWishlistChange?.(product._id, next);
    } catch (error) {
      setWishlisted(!next); // revert on failure
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      className="product-card"
      onClick={goToProduct}
      role="link"
      tabIndex={0}
      aria-label={`${product.title}, ₹${Number(product.price).toLocaleString("en-IN")}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToProduct();
        }
      }}
      initial={{ opacity: 0, y: reduce ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: [0.22, 0.7, 0.2, 1] }}
    >
      <div className="product-img">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.title} loading="lazy" />
        ) : (
          <ImageOff size={40} strokeWidth={1.5} />
        )}
        <button
          className={"product-wishlist" + (wishlisted ? " active" : "")}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={toggleWishlist}
        >
          <Heart size={18} strokeWidth={1.8} />
        </button>
      </div>

      <div className="product-info">
        {product.brand && <div className="product-brand">{product.brand}</div>}

        <div className="product-name">{product.title}</div>

        <div className="product-rating">
          <Stars value={rating} />
          <span className="product-rating-text">{rating.toFixed(1)}</span>
        </div>

        <div className="product-price">
          <span className="product-price-current">
            <span className="cur">₹</span>
            {Number(product.price).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="product-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              goToProduct();
            }}
          >
            <ShoppingBag size={15} /> View
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
