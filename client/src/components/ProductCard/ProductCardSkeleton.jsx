// Placeholder card shown while products are still loading (e.g. Render cold
// start). Mirrors the ProductCard layout so the grid doesn't jump on swap.
function ProductCardSkeleton() {
  return (
    <div className="product-card skeleton-card" aria-hidden="true">
      <div className="product-img skel" />
      <div className="product-info">
        <div className="skel skel-line" style={{ width: "40%", height: 11 }} />
        <div className="skel skel-line" style={{ width: "85%", height: 17, margin: "8px 0 12px" }} />
        <div className="skel skel-line" style={{ width: "55%", height: 12, marginBottom: 16 }} />
        <div className="skel skel-line" style={{ width: "35%", height: 18 }} />
        <div className="skel skel-line" style={{ width: "100%", height: 34, marginTop: 14, borderRadius: 8 }} />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
