import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/ProductCard/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1
        className="
        text-5xl
        font-bold
        mb-10
        "
      >
        All Products
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
  w-full
  mb-8
  p-3
  rounded-xl
  bg-[#111827]
  border border-gray-700
  "
      />

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-8
        "
      >
       {
products
.filter((product) =>
  product.title
    .toLowerCase()
    .includes(
      search.toLowerCase()
    )
)
.map((product) => (

  <ProductCard
    key={product._id}
    product={product}
  />

))
}
      </div>
    </div>
  );
}

export default Products;
