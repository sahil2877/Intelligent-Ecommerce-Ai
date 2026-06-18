import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import AIStylistBanner from "../../components/AIStylistBanner/AIStylistBanner";

const categories = [
  { icon: "💻", name: "Laptops", count: "1,240 items", bg: "rgba(99,102,241,.15)" },
  { icon: "📱", name: "Smartphones", count: "3,860 items", bg: "rgba(16,185,129,.15)" },
  { icon: "🎧", name: "Audio", count: "820 items", bg: "rgba(245,158,11,.15)" },
  { icon: "🎮", name: "Gaming", count: "2,140 items", bg: "rgba(167,139,250,.15)" },
  { icon: "📷", name: "Cameras", count: "460 items", bg: "rgba(244,63,94,.15)" },
  { icon: "⌚", name: "Wearables", count: "980 items", bg: "rgba(6,182,212,.15)" },
];

const testimonials = [
  {
    initials: "AK",
    quote:
      "The AI Stylist is genuinely mind-blowing. I just said \"gaming setup under 1 lakh\" and it recommended exactly what I needed. Saved me hours of research.",
    name: "Arjun Kumar",
    role: "Software Engineer, Bengaluru",
  },
  {
    initials: "PS",
    quote:
      "Ordered a Sony camera on Tuesday, received it Thursday. The packaging was immaculate and the product was exactly as described. Will never shop anywhere else.",
    name: "Priya Sharma",
    role: "Photographer, Mumbai",
  },
  {
    initials: "RV",
    quote:
      "The design of this website is stunning — it actually feels like using an Apple product. Smooth, fast, and every detail is perfect. 10/10 would recommend.",
    name: "Rahul Verma",
    role: "UX Designer, Delhi",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Hero />

      {/* CATEGORIES */}
      <section className="section-sm">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "28px",
            }}
          >
            <div>
              <div className="eyebrow">Shop by Category</div>
              <h2 className="display-md">Find What You Need</h2>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate("/products")}
            >
              View all →
            </button>
          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="category-card"
                onClick={() => navigate("/products")}
              >
                <div className="category-icon" style={{ background: cat.bg }}>
                  {cat.icon}
                </div>
                <div className="category-name">{cat.name}</div>
                <div className="category-count">{cat.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section className="section-sm">
        <div className="container">
          <div className="featured-banner">
            <div>
              <div className="badge badge-primary mb-12">New Arrival</div>
              <h2 className="display-md mb-16">
                Premium Tech
                <br />
                <span className="grad-text-primary">Redefine Possible</span>
              </h2>
              <p className="subheading mb-24" style={{ maxWidth: "420px" }}>
                Discover the latest flagship devices, curated and recommended by
                our AI — built for developers, creators, and visionaries.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/products")}
                >
                  Shop Now
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => navigate("/ai-stylist")}
                >
                  Ask AI Stylist
                </button>
              </div>
            </div>
            <div className="featured-banner-img">💻</div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <AIStylistBanner />

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Loved by Thousands
            </div>
            <h2 className="display-md">What Our Customers Say</h2>
          </div>
          <div className="grid-3">
            {testimonials.map((t) => (
              <div key={t.initials} className="testimonial-card">
                <div className="stars mb-12">★★★★★</div>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
