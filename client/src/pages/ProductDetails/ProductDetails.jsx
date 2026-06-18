import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function ProductDetails() {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/cart/add/${product._id}`,
        {
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
        {
          rating: Number(rating),
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
        Loading...
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
  const avgRounded = Math.round(avg);
  const avgStars =
    "★★★★★".slice(0, avgRounded) + "☆☆☆☆☆".slice(0, 5 - avgRounded);

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
            {images[0] ? (
              <img src={images[0]} alt={product.title} />
            ) : (
              <span>🛍️</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="product-gallery-thumbs">
              {images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className={"gallery-thumb" + (i === 0 ? " active" : "")}
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
            <div className="badge badge-success mb-12">✓ In Stock</div>
          ) : (
            <div className="badge badge-rose mb-12">Out of Stock</div>
          )}

          <h1 className="product-detail-title">{product.title}</h1>

          <div className="product-meta">
            <div className="stars">{avgStars}</div>
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
                <span style={{ color: "var(--border)" }}>|</span>
                <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                  {product.brand}
                </span>
              </>
            )}
          </div>

          <div className="product-detail-price">
            <span className="price-big">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
          </div>

          <p
            className="mb-24"
            style={{ color: "var(--body)", lineHeight: 1.7 }}
          >
            {product.description}
          </p>

          {/* CTAs */}
          <div className="product-ctas">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>
            <button
              className="btn btn-ghost btn-lg"
              onClick={handleAddToWishlist}
            >
              ♡ Add to Wishlist
            </button>
          </div>

          {/* Trust */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "var(--elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>🚚</div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--snow)",
                }}
              >
                Free Delivery
              </div>
            </div>
            <div
              style={{
                background: "var(--elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>↩️</div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--snow)",
                }}
              >
                Easy Returns
              </div>
            </div>
            <div
              style={{
                background: "var(--elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>🛡️</div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--snow)",
                }}
              >
                Warranty
              </div>
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
            <div
              className="stars"
              style={{
                justifyContent: "center",
                fontSize: "18px",
                margin: "6px 0",
              }}
            >
              {avgStars}
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
        {reviews.map((review) => {
          const r = Math.round(review.rating || 0);
          const rStars = "★★★★★".slice(0, r) + "☆☆☆☆☆".slice(0, 5 - r);
          return (
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
                <div className="stars">{rStars}</div>
              </div>
              <div className="review-body">{review.comment}</div>
            </div>
          );
        })}

        {/* Write a review */}
        <div className="write-review-card mt-24">
          <div className="heading mb-16">Write a Review</div>
          <div style={{ marginBottom: "16px" }}>
            <div className="form-label mb-8">Your Rating</div>
            <div
              className="stars"
              style={{ fontSize: "24px", gap: "4px", cursor: "pointer" }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} onClick={() => setRating(n)}>
                  {n <= rating ? "★" : "☆"}
                </span>
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
