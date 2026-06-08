import { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

function AIStylist() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleAskAI = async () => {
    if (!query) return;

    try {
      setLoading(true);

      const res = await api.post("/ai/stylist", {
        query,
      });

      console.log(res.data.recommendedProducts);
      setResponse(res.data.recommendation);
      setProducts(res.data.recommendedProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div
        className="
        bg-white/5
        border border-white/10
        rounded-3xl
        p-8
        backdrop-blur-md
        "
      >
        <h2 className="text-4xl font-bold mb-4">AI Product Stylist</h2>

        <p className="text-gray-400 mb-6">
          Tell us what you need and get intelligent recommendations.
        </p>

        <textarea
          rows="4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Example: I need a smartphone under 1 lakh for photography"
          className="
          w-full
          p-4
          rounded-xl
          bg-[#111827]
          border border-gray-700
          "
        />
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={() => setQuery("I need a gaming laptop under 80000")}
            className="border px-3 py-2 rounded"
          >
            Gaming Laptop
          </button>

          <button
            onClick={() =>
              setQuery("Best smartphone under 50000 for photography")
            }
            className="border px-3 py-2 rounded"
          >
            Photography Phone
          </button>

          <button
            onClick={() => setQuery("Best wireless earbuds under 10000")}
            className="border px-3 py-2 rounded"
          >
            Audio Products
          </button>
        </div>

        <button
          onClick={handleAskAI}
          className="
          mt-4
          bg-purple-600
          px-6
          py-3
          rounded-xl
          "
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {response && (
          <div
            className="
  mt-8
  p-5
  bg-[#111827]
  rounded-xl
  whitespace-pre-wrap
  "
          >
            {response}
          </div>
        )}
        {products.length > 0 && (
          <div className="mt-10">
            <h3
              className="
      text-2xl
      font-bold
      mb-6
      "
            >
              Recommended Products
            </h3>

            <div
              className="
      grid
      md:grid-cols-3
      gap-6
      "
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  className="
          bg-[#111827]
          p-4
          rounded-xl
          "
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="
            w-full
            h-48
            object-cover
            rounded-lg
            "
                  />

                  <h4
                    className="
            mt-4
            font-bold
            "
                  >
                    {product.title}
                  </h4>

                  <p>{product.brand}</p>

                  <p
                    className="
            text-purple-400
            font-bold
            "
                  >
                    ₹{product.price}
                  </p>
                  <Link
                    to={`/products/${product._id}`}
                    className="
  block
  mt-4
  bg-purple-600
  text-center
  py-2
  rounded-lg
  "
                  >
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AIStylist;
