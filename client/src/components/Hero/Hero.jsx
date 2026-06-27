import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
} from "lucide-react";
import heroImg from "../../assets/hero.png";

// 3 auto-rotating banners: a main statement, the AI Stylist feature, and an offer.
// Each slide has a base gradient so it still looks designed if its photo fails to load.
const slides = [
  {
    key: "main",
    eyebrow: "New season · Curated edit",
    title: (
      <>
        Curated for the way
        <br />
        you <em>actually</em> shop.
      </>
    ),
    sub: "Premium tech and fashion, hand-picked and ready to ship — no endless scrolling, no guesswork.",
    cta: { label: "Browse the edit", to: "/products", icon: ArrowRight },
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1500&q=80",
    base: "radial-gradient(90% 120% at 80% 20%, rgba(198,91,51,.35), transparent 55%), linear-gradient(120deg, #1a140d, #120f0b)",
    overlay:
      "linear-gradient(90deg, rgba(17,15,12,.94) 0%, rgba(17,15,12,.72) 44%, rgba(17,15,12,.2) 100%)",
  },
  {
    key: "ai",
    eyebrow: "Powered by AI",
    title: (
      <>
        Meet your personal
        <br />
        <em>AI Stylist.</em>
      </>
    ),
    sub: "Describe what you need in plain words — our AI reads between the lines and finds your perfect match.",
    cta: { label: "Ask the AI Stylist", to: "/ai-stylist", icon: Sparkles },
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1500&q=80",
    base: "radial-gradient(90% 120% at 78% 18%, rgba(224,166,70,.4), transparent 55%), linear-gradient(120deg, #1c1408, #120f0b)",
    overlay:
      "linear-gradient(90deg, rgba(17,15,12,.94) 0%, rgba(17,15,12,.74) 46%, rgba(17,15,12,.22) 100%)",
  },
  {
    key: "offer",
    eyebrow: "Limited-time offer",
    title: (
      <>
        Get <em>20% off</em>
        <br />
        your first order.
      </>
    ),
    sub: "New here? Treat yourself. Use the code at checkout on anything in the store this week.",
    coupon: "WELCOME20",
    cta: { label: "Shop the sale", to: "/products", icon: Tag },
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1500&q=80",
    base: "radial-gradient(90% 120% at 80% 20%, rgba(217,125,84,.4), transparent 55%), linear-gradient(120deg, #1d150d, #120f0b)",
    overlay:
      "linear-gradient(90deg, rgba(17,15,12,.94) 0%, rgba(17,15,12,.7) 44%, rgba(17,15,12,.2) 100%)",
  },
];

function Hero() {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  const paginate = useCallback(
    (step) => {
      setState(([i]) => [(i + step + n) % n, step]);
    },
    [n],
  );
  const goTo = (i) => setState(([cur]) => [i, i > cur ? 1 : -1]);

  // auto-advance every 5s, paused on hover/focus
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => paginate(1), 5000);
    return () => clearInterval(t);
  }, [paused, index, paginate]);

  const slide = slides[index];

  const variants = {
    enter: (d) => ({ opacity: 0, x: reduce ? 0 : d >= 0 ? 90 : -90 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: reduce ? 0 : d >= 0 ? -90 : 90 }),
  };

  return (
    <section className="hero-section">
      <div
        className="hero-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        aria-roledescription="carousel"
      >
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={slide.key}
            className="hero-slide"
            style={{ background: slide.base }}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 0.7, 0.2, 1] }}
          >
            <div className="hero-slide-bg">
              <img
                src={slide.image || heroImg}
                alt=""
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div
              className="hero-slide-overlay"
              style={{ background: slide.overlay }}
            />

            <div className="hero-slide-content">
              <motion.div
                className="hero-slide-inner"
                initial={{ opacity: 0, y: reduce ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <div className="hero-eyebrow">
                  <span className="hero-eyebrow-dot" />
                  {slide.eyebrow}
                </div>

                <h1 className="display-xl">{slide.title}</h1>
                <p className="hero-sub">{slide.sub}</p>

                {slide.coupon && (
                  <div className="hero-coupon">
                    Use code <code>{slide.coupon}</code>
                  </div>
                )}

                <div className="hero-cta">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate(slide.cta.to)}
                  >
                    <slide.cta.icon size={18} /> {slide.cta.label}
                  </button>
                  {slide.key !== "ai" && (
                    <button
                      className="btn btn-ghost btn-lg"
                      onClick={() => navigate("/ai-stylist")}
                    >
                      <Sparkles size={17} /> Ask AI Stylist
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* arrows */}
        <button
          className="hero-arrow prev"
          aria-label="Previous slide"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          className="hero-arrow next"
          aria-label="Next slide"
          onClick={() => paginate(1)}
        >
          <ChevronRight size={22} />
        </button>

        {/* dots */}
        <div className="hero-dots">
          {slides.map((s, i) => (
            <button
              key={s.key}
              className={"hero-dot" + (i === index ? " active" : "")}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      {/* thin trust strip */}
      <div className="hero-trust-strip">
        <div className="hero-trust-strip-inner">
          <div className="trust-item">
            <ShieldCheck size={17} strokeWidth={1.8} /> Authentic &amp; verified
          </div>
          <div className="trust-item">
            <Truck size={17} strokeWidth={1.8} /> Free 2-day delivery
          </div>
          <div className="trust-item">
            <RotateCcw size={17} strokeWidth={1.8} /> 7-day easy returns
          </div>
          <div className="trust-item">
            <Sparkles size={17} strokeWidth={1.8} /> AI personal shopper
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
