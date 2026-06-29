import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import api from "../../api/axios";
import ProductCard from "../ProductCard/ProductCard";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";
import { viewportOnce } from "../../lib/motion";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="eyebrow">The edit</div>
            <h2 className="display-md">Featured this week</h2>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/products")}
          >
            View all <ArrowRight size={15} />
          </button>
        </motion.div>

        <div className="grid-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
