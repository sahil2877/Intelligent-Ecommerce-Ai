import { useNavigate } from "react-router-dom";

function AIStylistBanner() {
  const navigate = useNavigate();

  return (
    <section className="section-sm">
      <div className="container">
        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(99,102,241,.12) 0%,rgba(167,139,250,.08) 100%)",
            border: "1px solid rgba(99,102,241,.2)",
            borderRadius: "var(--radius-xl)",
            padding: "48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(99,102,241,.2),transparent 70%)",
              pointerEvents: "none",
            }}
          ></div>
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>✦</div>
          <h2 className="display-md mb-16">Tell Us What You Need</h2>
          <p
            className="subheading"
            style={{ maxWidth: "480px", margin: "0 auto 28px" }}
          >
            "I need a gaming laptop under ₹80,000 for college" — and our AI finds
            the perfect match for you instantly.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "28px",
            }}
          >
            <span className="ai-chip">"Best noise-cancelling headphones"</span>
            <span className="ai-chip">"Camera for travel under ₹40k"</span>
            <span className="ai-chip">"Smart TV for bedroom 43 inch"</span>
          </div>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/ai-stylist")}
          >
            Try AI Stylist →
          </button>
        </div>
      </div>
    </section>
  );
}

export default AIStylistBanner;
