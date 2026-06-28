import { useEffect } from "react";

// Lightweight per-page <title> + meta description manager (no extra deps).
// SPA-friendly: updates document head on mount / when args change.
export default function useDocumentTitle(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}
