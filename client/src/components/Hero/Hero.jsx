import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot"></span>
          Powered by Artificial Intelligence
        </div>

        <h1 className="display-xl">
          Shop Smarter with
          <br />
          <span className="grad-text">Your AI Stylist</span>
        </h1>

        <p className="hero-sub">
          Describe what you're looking for in plain language — get personalized
          recommendations instantly. Premium products, curated for you.
        </p>

        <div className="hero-cta">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/ai-stylist")}
          >
            ✦ Ask AI Stylist
          </button>
          <button
            className="btn btn-ghost btn-lg"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">50K+</div>
            <div className="hero-stat-label">Products</div>
          </div>
          <div>
            <div className="hero-stat-num">2.4M</div>
            <div className="hero-stat-label">Happy Customers</div>
          </div>
          <div>
            <div className="hero-stat-num">99.2%</div>
            <div className="hero-stat-label">Satisfaction Rate</div>
          </div>
          <div>
            <div className="hero-stat-num">4.9★</div>
            <div className="hero-stat-label">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
