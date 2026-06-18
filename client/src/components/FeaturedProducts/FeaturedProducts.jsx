import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import ProductCard from "../ProductCard/ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");

        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "32px",
          }}
        >
          <div>
            <div className="eyebrow">Handpicked</div>
            <h2 className="display-md">Featured Products</h2>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/products")}
          >
            View all →
          </button>
        </div>

        <div className="grid-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
