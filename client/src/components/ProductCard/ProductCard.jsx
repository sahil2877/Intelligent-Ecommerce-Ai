import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const goToProduct = () => navigate(`/products/${product._id}`);

  const rating = Math.round(product.averageRating || 0);
  const stars = "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);

  return (
    <div className="product-card" onClick={goToProduct}>
      <div className="product-img">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.title} />
        ) : (
          <span style={{ fontSize: "48px", opacity: 0.4 }}>🛍️</span>
        )}
      </div>

      <div className="product-info">
        {product.brand && <div className="product-brand">{product.brand}</div>}

        <div className="product-name">{product.title}</div>

        <div className="product-rating">
          <div className="stars">{stars}</div>
          <span className="product-rating-text">
            {(product.averageRating || 0).toFixed
              ? Number(product.averageRating || 0).toFixed(1)
              : product.averageRating || 0}
          </span>
        </div>

        <div className="product-price">
          <span className="product-price-current">
            ₹{Number(product.price).toLocaleString("en-IN")}
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
            View Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
