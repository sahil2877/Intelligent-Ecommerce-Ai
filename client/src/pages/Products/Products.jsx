import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import ProductCard from "../../components/ProductCard/ProductCard";

function Products() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const searchQuery =
  new URLSearchParams(
    location.search
  ).get("search") || "";

const [search, setSearch] =
  useState(searchQuery);

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  useEffect(() => {

  setSearch(
    searchQuery
  );

}, [searchQuery]);

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

    const fetchCategories =
async () => {

  try {

    const res =
      await api.get(
        "/categories"
      );

    setCategories(
      res.data.categories
    );

  } catch (error) {

    console.log(error);

  }
};

fetchCategories();
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
      <div className="flex gap-4 mb-8 flex-wrap">

  <button
    onClick={() =>
      setSelectedCategory("All")
    }
    className="
    bg-purple-600
    px-4
    py-2
    rounded-lg
    "
  >
    All
  </button>

  {categories.map((category) => (

    <button
      key={category._id}
      onClick={() =>
        setSelectedCategory(
          category.name
        )
      }
      className="
      bg-[#111827]
      px-4
      py-2
      rounded-lg
      "
    >
      {category.name}
    </button>

  ))}

</div>

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
        {products
.filter((product) => {

  const matchesSearch =
    product.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      );

  const matchesCategory =

    selectedCategory ===
    "All"

    ||

    product.category?.name ===
    selectedCategory;

  return (
    matchesSearch &&
    matchesCategory
  );

})
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      
    </div>

    
  );
}

export default Products;
