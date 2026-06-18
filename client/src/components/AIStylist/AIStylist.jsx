import { useState } from "react";
import api from "../../api/axios";
import ProductCard from "../ProductCard/ProductCard";

const suggestions = [
  "Gaming laptop under ₹80,000",
  "Best noise-cancelling headphones",
  "iPhone alternative under ₹50k",
  "4K camera for YouTube",
  "Smart TV 55\" under ₹60k",
  "Lightweight laptop for college",
];

function AIStylist() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [lastQuery, setLastQuery] = useState("");

  const handleAskAI = async () => {
    if (!query) return;

    try {
      setLoading(true);
      setLastQuery(query);

      const res = await api.post("/ai/stylist", {
        query,
      });

      console.log(res.data.recommendedProducts);
      setResponse(res.data.recommendation);
      setProducts(res.data.recommendedProducts);
    } catch (error) {
      console.log(error);
      console.log(error.response);
console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-page">
      <div className="container">
        <div className="ai-hero">
          <div className="ai-orb">✦</div>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            Shopwise AI Stylist
          </div>
          <h1 className="display-lg mb-16">Your Personal Shopping AI</h1>
          <p
            className="subheading"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            Describe what you need in natural language. Our AI understands
            context, budget, and preferences to find your perfect product.
          </p>
        </div>

        <div className="ai-terminal">
          <div className="ai-terminal-bar">
            <div className="terminal-dot" style={{ background: "#F43F5E" }}></div>
            <div className="terminal-dot" style={{ background: "#F59E0B" }}></div>
            <div className="terminal-dot" style={{ background: "#10B981" }}></div>
            <span
              style={{
                marginLeft: "8px",
                fontSize: "12px",
                color: "var(--muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              AI Stylist — Shopwise AI
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: "11px",
                color: "var(--emerald)",
                background: "rgba(16,185,129,.1)",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              ● Online
            </span>
          </div>

          <div className="ai-chat">
            <div className="ai-msg assistant">
              <div className="ai-msg-avatar">✦</div>
              <div className="ai-msg-bubble">
                Hello! I'm your personal AI Shopping Stylist. Tell me what you're
                looking for — include your budget, use case, or any preferences —
                and I'll find the perfect products for you.
                <br />
                <br />
                <span style={{ color: "var(--muted)", fontSize: "13px" }}>
                  Try asking: "I need a gaming laptop under ₹80,000"
                </span>
              </div>
            </div>

            {lastQuery && (
              <div className="ai-msg user">
                <div className="ai-msg-avatar">U</div>
                <div className="ai-msg-bubble">{lastQuery}</div>
              </div>
            )}

            {loading && (
              <div className="ai-msg assistant">
                <div className="ai-msg-avatar">✦</div>
                <div className="ai-typing">
                  <div className="ai-typing-dot"></div>
                  <div className="ai-typing-dot"></div>
                  <div className="ai-typing-dot"></div>
                </div>
              </div>
            )}

            {!loading && response && (
              <div className="ai-msg assistant">
                <div className="ai-msg-avatar">✦</div>
                <div
                  className="ai-msg-bubble"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {response}
                </div>
              </div>
            )}
          </div>

          <div className="ai-input-row">
            <textarea
              className="ai-input"
              rows="1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAskAI();
                }
              }}
              placeholder="Ask anything — budget, use case, brand preference, specs…"
            />
            <button
              className="ai-send"
              onClick={handleAskAI}
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>

        <div className="ai-suggestions">
          <div className="ai-suggestion-label">Try these prompts:</div>
          <div className="ai-suggestion-chips">
            {suggestions.map((s) => (
              <span
                key={s}
                className="ai-chip"
                onClick={() => setQuery(s)}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {products.length > 0 && (
          <div className="ai-results">
            <div className="ai-results-header">
              <div className="ai-results-line"></div>
              <div className="ai-results-label">
                ✦ {products.length} AI Recommendations
              </div>
              <div className="ai-results-line"></div>
            </div>
            <div className="grid-3" style={{ marginBottom: "64px" }}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIStylist;
