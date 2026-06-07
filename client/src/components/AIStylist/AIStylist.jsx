import { useState } from "react";
import api from "../../api/axios";

function AIStylist() {

  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {

    if (!query) return;

    try {

      setLoading(true);

      const res = await api.post(
        "/ai/stylist",
        {
          query
        }
      );

      setResponse(
        res.data.recommendation
      );

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

        <h2 className="text-4xl font-bold mb-4">
          AI Product Stylist
        </h2>

        <p className="text-gray-400 mb-6">
          Tell us what you need and get
          intelligent recommendations.
        </p>

        <textarea
          rows="4"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Example: I need a smartphone under 1 lakh for photography"
          className="
          w-full
          p-4
          rounded-xl
          bg-[#111827]
          border border-gray-700
          "
        />

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
          {loading
            ? "Thinking..."
            : "Ask AI"}
        </button>

        {response && (

          <div
            className="
            mt-8
            p-5
            bg-[#111827]
            rounded-xl
            "
          >
            {response}
          </div>

        )}

      </div>

    </section>
  );
}

export default AIStylist;