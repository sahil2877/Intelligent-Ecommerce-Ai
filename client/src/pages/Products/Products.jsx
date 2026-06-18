import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../api/axios";
import ProductCard from "../../components/ProductCard/ProductCard";

function Products() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const searchQuery =
    new URLSearchParams(location.search).get("search") || "";

  const [search, setSearch] = useState(searchQuery);

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setSearch(searchQuery);
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

    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");

        setCategories(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const filtered = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container section-sm">
      {/* Breadcrumb */}
      <div
        style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "24px" }}
      >
        <span>Home</span>
        <span style={{ margin: "0 8px", opacity: 0.4 }}>/</span>
        <span style={{ color: "var(--body)" }}>
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </span>
      </div>

      <div className="listing-layout">
        {/* FILTERS */}
        <aside className="filter-panel">
          <div className="flex justify-between items-center mb-16">
            <span className="filter-title">Filters</span>
            <button
              className="btn btn-ghost btn-sm"
              style={{ fontSize: "12px", padding: "4px 10px" }}
              onClick={() => {
                setSelectedCategory("All");
                setSearch("");
              }}
            >
              Clear all
            </button>
          </div>

          <div className="filter-section">
            <div className="filter-section-label">Search</div>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="filter-section">
            <div className="filter-section-label">Category</div>
            <div
              className="filter-check"
              onClick={() => setSelectedCategory("All")}
            >
              <div
                className={
                  "filter-check-box" +
                  (selectedCategory === "All" ? " checked" : "")
                }
              ></div>
              <span className="filter-check-label">All</span>
            </div>
            {categories.map((category) => (
              <div
                key={category._id}
                className="filter-check"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div
                  className={
                    "filter-check-box" +
                    (selectedCategory === category.name ? " checked" : "")
                  }
                ></div>
                <span className="filter-check-label">{category.name}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* PRODUCT GRID */}
        <div>
          <div className="listing-toolbar">
            <span className="listing-count">
              Showing{" "}
              <strong style={{ color: "var(--snow)" }}>
                {filtered.length} products
              </strong>
            </span>
            <div className="listing-sort">
              <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                Sort by:
              </span>
              <select className="sort-select">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          <div className="grid-3">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
