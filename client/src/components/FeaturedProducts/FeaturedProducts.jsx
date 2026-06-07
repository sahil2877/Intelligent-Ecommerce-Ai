import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../ProductCard/ProductCard";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

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
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold mb-10">Featured Products</h2>

      <div
        className="grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-8"
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
