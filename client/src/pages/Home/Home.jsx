import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Headphones,
  Gamepad2,
  Camera,
  Watch,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Hero from "../../components/Hero/Hero";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import AIStylistBanner from "../../components/AIStylistBanner/AIStylistBanner";
import Stars from "../../components/ui/Stars";
import { viewportOnce } from "../../lib/motion";
import useDocumentTitle from "../../lib/useDocumentTitle";

const categories = [
  { Icon: Laptop, name: "Laptops", count: "1,240 items" },
  { Icon: Smartphone, name: "Smartphones", count: "3,860 items" },
  { Icon: Headphones, name: "Audio", count: "820 items" },
  { Icon: Gamepad2, name: "Gaming", count: "2,140 items" },
  { Icon: Camera, name: "Cameras", count: "460 items" },
  { Icon: Watch, name: "Wearables", count: "980 items" },
];

const testimonials = [
  {
    initials: "AK",
    quote:
      "I just said “gaming setup under 1 lakh” and it recommended exactly what I needed. Saved me hours of research.",
    name: "Arjun Kumar",
    role: "Software Engineer, Bengaluru",
  },
  {
    initials: "PS",
    quote:
      "Ordered a Sony camera on Tuesday, received it Thursday. Immaculate packaging, exactly as described. Never shopping anywhere else.",
    name: "Priya Sharma",
    role: "Photographer, Mumbai",
  },
  {
    initials: "RV",
    quote:
      "The whole experience feels considered — smooth, fast, every detail in its place. It's the rare store that feels genuinely premium.",
    name: "Rahul Verma",
    role: "UX Designer, Delhi",
  },
];

const fade = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
  transition: { duration: 0.55 },
};

function Home() {
  const navigate = useNavigate();
  useDocumentTitle(
    "Shopwise AI — Smarter shopping, powered by AI",
    "Premium tech and fashion, hand-picked by an AI personal shopper. Curated for the way you actually shop.",
  );

  return (
    <>
      <Hero />

      {/* CATEGORIES */}
      <section className="section-sm">
        <div className="container">
          <motion.div className="section-head" {...fade}>
            <div>
              <div className="eyebrow">Browse</div>
              <h2 className="display-md">Shop by category</h2>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate("/products")}
            >
              View all <ArrowRight size={15} />
            </button>
          </motion.div>

          <div className="category-grid">
            {categories.map(({ Icon, name, count }, i) => (
              <motion.div
                key={name}
                className="category-card"
                onClick={() => navigate("/products")}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="category-icon">
                  <Icon size={26} strokeWidth={1.7} />
                </div>
                <div className="category-name">{name}</div>
                <div className="category-count">{count}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BANNER */}
      <section className="section-sm">
        <div className="container">
          <motion.div className="featured-banner" {...fade}>
            <div>
              <div className="badge badge-primary mb-12">New arrival</div>
              <h2 className="display-md mb-16">
                Premium tech,
                <br />
                <span className="grad-text-primary">made personal</span>
              </h2>
              <p className="subheading mb-24" style={{ maxWidth: "420px" }}>
                Discover the latest flagship devices — hand-selected and
                recommended by our AI for developers, creators, and visionaries.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/products")}
                >
                  Shop now <ArrowRight size={16} />
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => navigate("/ai-stylist")}
                >
                  <Sparkles size={16} /> Ask AI Stylist
                </button>
              </div>
            </div>
            <div className="featured-banner-img">
              <Laptop strokeWidth={1.1} />
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturedProducts />

      <AIStylistBanner />

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <motion.div
            style={{ textAlign: "center", marginBottom: "48px" }}
            {...fade}
          >
            <div className="eyebrow" style={{ justifyContent: "center" }}>
              Loved by thousands
            </div>
            <h2 className="display-md">What our customers say</h2>
          </motion.div>

          <div className="grid-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.initials}
                className="testimonial-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="mb-12">
                  <Stars value={5} size={15} />
                </div>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
