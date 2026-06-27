import { Star } from "lucide-react";

// Consistent outline/filled star rating using Lucide (replaces ★☆ glyphs).
function Stars({ value = 0, size = 14 }) {
  const rounded = Math.round(value);
  return (
    <span className="stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.75}
          fill={i <= rounded ? "currentColor" : "none"}
          color={i <= rounded ? "currentColor" : "var(--subtle)"}
        />
      ))}
    </span>
  );
}

export default Stars;
