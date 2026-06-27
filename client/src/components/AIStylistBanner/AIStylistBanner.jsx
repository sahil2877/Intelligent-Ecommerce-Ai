import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { viewportOnce } from "../../lib/motion";

function AIStylistBanner() {
  const navigate = useNavigate();

  const prompts = [
    "Best noise-cancelling headphones under ₹20k",
    "A camera for travel under ₹40k",
    "Smart TV for the bedroom, 43 inch",
  ];

  return (
    <section className="section-sm">
      <div className="container">
        <motion.div
          className="ai-banner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <div className="ai-banner-orb">
            <Sparkles size={26} strokeWidth={2} />
          </div>
          <h2 className="display-md mb-16">Tell us what you need</h2>
          <p
            className="subheading"
            style={{ maxWidth: "520px", margin: "0 auto 28px" }}
          >
            Describe it in your own words — our AI stylist reads between the
            lines and finds the match. No endless scrolling, no guesswork.
          </p>
          <div className="ai-banner-chips">
            {prompts.map((p) => (
              <button
                key={p}
                className="ai-chip"
                onClick={() => navigate("/ai-stylist")}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            className="btn btn-primary btn-lg mt-24"
            onClick={() => navigate("/ai-stylist")}
          >
            <Sparkles size={17} /> Try the AI Stylist <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default AIStylistBanner;
