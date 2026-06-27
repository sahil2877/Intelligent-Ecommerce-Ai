// Shared Framer Motion presets — restrained, premium, reduced-motion aware.
// Components pair these with `useReducedMotion()` so that when a user prefers
// reduced motion we drop the y-axis travel and only fade (or skip entirely).

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.7, 0.2, 1] },
  },
};

export const fadeUpReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

// Stagger container for grids / lists.
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

// Standard whileInView viewport config — animate once, a little before fully visible.
export const viewportOnce = { once: true, margin: "0px 0px -80px 0px" };

// Helper: pick the right variant set based on the reduced-motion preference.
export const pickFade = (reduced) => (reduced ? fadeUpReduced : fadeUp);
