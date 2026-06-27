import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ImageOff,
  CircleCheck,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
} from "lucide-react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import Stars from "../../components/ui/Stars";

function ProductDetails() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        `/cart/add/${product._id}`,
        { quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toast.error(error.response?.data?.message || "Failed to add cart");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        `/wishlist/add/${product._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Added to wishlist");
    } catch (error) {
      toast.error("Failed to add wishlist");
    }
  };

  const handleReview = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        `/reviews/${id}`,
        { rating: Number(rating), comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Review Added");
      setComment("");
      fetchReviews();
      fetchProduct();
    } catch (error) {
      toast.error(error.response?.data?.message || "Review Failed");
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/${id}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="container section-sm text-center text-muted">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container section-sm text-center text-muted">
        Product Not Found
      </div>
    );
  }

  const avg = Number(product.averageRating || 0);
  const images =
    product.images && product.images.length > 0 ? product.images : [];

  return (
    <div className="container section-sm">
      {/* Breadcrumb */}
      <div
        style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "32px" }}
      >
        <span>Home</span>
        <span style={{ margin: "0 8px", opacity: 0.4 }}>/</span>
        <span>{product.category?.name || "Products"}</span>
        <span style={{ margin: "0 8px", opacity: 0.4 }}>/</span>
        <span style={{ color: "var(--body)" }}>{product.title}</span>
      </div>

      <div className="product-detail-layout">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-gallery-main">
            {images[activeImg] ? (
              <img src={images[activeImg]} alt={product.title} />
            ) : (
              <ImageOff size={56} strokeWidth={1.4} />
            )}
          </div>
          {images.length > 1 && (
            <div className="product-gallery-thumbs">
              {images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className={"gallery-thumb" + (i === activeImg ? " active" : "")}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.title} ${i + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.stock > 0 ? (
            <div className="badge badge-success mb-12">
              <CircleCheck size={13} /> In Stock
            </div>
          ) : (
            <div className="badge badge-rose mb-12">Out of Stock</div>
          )}

          <h1 className="product-detail-title">{product.title}</h1>

          <div className="product-meta">
            <Stars value={avg} size={16} />
            <span
              style={{ fontSize: "14px", color: "var(--body)", fontWeight: 600 }}
            >
              {avg.toFixed(1)}
            </span>
            <span style={{ fontSize: "14px", color: "var(--muted)" }}>
              {reviews.length} reviews
            </span>
            {product.brand && (
              <>
                <span style={{ color: "var(--border-med)" }}>|</span>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                  {product.brand}
                </span>
              </>
            )}
          </div>

          <div className="product-detail-price">
            <span className="price-big">
              <span className="cur">₹</span>
              {Number(product.price).toLocaleString("en-IN")}
            </span>
          </div>

          <p className="mb-24" style={{ color: "var(--body)", lineHeight: 1.7 }}>
            {product.description}
          </p>

          {/* CTAs */}
          <div className="product-ctas">
            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button
              className="btn btn-ghost btn-lg"
              onClick={handleAddToWishlist}
            >
              <Heart size={18} /> Wishlist
            </button>
          </div>

          {/* Trust */}
          <div className="trust-row">
            <div className="trust-item">
              <Truck size={18} strokeWidth={1.8} /> Free delivery
            </div>
            <div className="trust-item">
              <RotateCcw size={18} strokeWidth={1.8} /> Easy returns
            </div>
            <div className="trust-item">
              <ShieldCheck size={18} strokeWidth={1.8} /> Warranty included
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-48">
        <div className="eyebrow">Community</div>
        <h2 className="display-md mb-32">Customer Reviews</h2>

        <div className="reviews-summary">
          <div className="reviews-score">
            <div className="reviews-score-num">{avg.toFixed(1)}</div>
            <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
              <Stars value={avg} size={17} />
            </div>
            <div className="reviews-score-out">{reviews.length} reviews</div>
          </div>
          <div>
            <p style={{ color: "var(--muted)" }}>
              Based on {reviews.length} verified customer{" "}
              {reviews.length === 1 ? "review" : "reviews"}.
            </p>
          </div>
        </div>

        {/* Review cards */}
        {reviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  {(review.user?.name || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="reviewer-name">
                    {review.user?.name || "User"}
                  </div>
                </div>
              </div>
              <Stars value={review.rating || 0} />
            </div>
            <div className="review-body">{review.comment}</div>
          </div>
        ))}

        {/* Write a review */}
        <div className="write-review-card mt-24">
          <div className="heading mb-16">Write a Review</div>
          <div style={{ marginBottom: "16px" }}>
            <div className="form-label mb-8">Your Rating</div>
            <div className="stars" style={{ gap: "6px" }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  onClick={() => setRating(n)}
                  style={{ display: "flex", color: "var(--gold)" }}
                >
                  <Star
                    size={26}
                    strokeWidth={1.6}
                    fill={n <= rating ? "currentColor" : "none"}
                    color={n <= rating ? "currentColor" : "var(--subtle)"}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="form-group mb-16">
            <label className="form-label">Your Review</label>
            <textarea
              className="form-textarea"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share what you liked, what could be better…"
            />
          </div>
          <button className="btn btn-primary" onClick={handleReview}>
            Publish Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
