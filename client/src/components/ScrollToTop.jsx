import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Reset scroll to top on every route change (SPAs otherwise keep the old
// scroll position when navigating between pages).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default ScrollToTop;
