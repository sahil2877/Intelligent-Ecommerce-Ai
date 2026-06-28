import { useNavigate } from "react-router-dom";
import { Compass, Home, ArrowLeft } from "lucide-react";
import useDocumentTitle from "../../lib/useDocumentTitle";

function NotFound() {
  const navigate = useNavigate();
  useDocumentTitle("Page not found · Shopwise AI");

  return (
    <div className="container section" style={{ textAlign: "center" }}>
      <div
        className="wishlist-empty-icon"
        style={{ width: 96, height: 96, margin: "0 auto 24px" }}
      >
        <Compass size={42} strokeWidth={1.5} />
      </div>
      <h1 className="display-lg mb-16">
        404 — <span className="grad-text-primary">lost in the aisles</span>
      </h1>
      <p
        className="subheading mb-32"
        style={{ maxWidth: 460, margin: "0 auto 32px" }}
      >
        The page you're looking for doesn't exist or may have moved. Let's get
        you back to shopping.
      </p>
      <div
        style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
      >
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/")}>
          <Home size={18} /> Back to home
        </button>
        <button
          className="btn btn-ghost btn-lg"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} /> Go back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
