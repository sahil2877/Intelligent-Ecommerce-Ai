import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SlidersHorizontal, X, Search } from "lucide-react";
import api from "../../api/axios";
import ProductCard from "../../components/ProductCard/ProductCard";

function Products() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const [products, setProducts] = useState([]);
  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  const [search, setSearch] = useState(searchQuery);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  const filtered = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearAll = () => {
    setSelectedCategory("All");
    setSearch("");
  };

  // Filter UI shared by desktop sidebar and the mobile drawer.
  const FilterControls = () => (
    <>
      <div className="filter-section">
        <div className="filter-section-label">Search</div>
        <div
          className="nav-search"
          style={{ display: "flex", maxWidth: "none" }}
        >
          <Search size={16} strokeWidth={2} />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-label">Category</div>
        <div className="filter-check" onClick={() => setSelectedCategory("All")}>
          <div
            className={
              "filter-check-box" +
              (selectedCategory === "All" ? " checked" : "")
            }
          />
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
            />
            <span className="filter-check-label">{category.name}</span>
          </div>
        ))}
      </div>
    </>
  );

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
        {/* DESKTOP FILTERS */}
        <aside className="filter-panel">
          <div className="flex justify-between items-center mb-16">
            <span className="filter-title">Filters</span>
            <button
              className="btn btn-ghost btn-sm"
              style={{ minHeight: "auto", padding: "5px 12px" }}
              onClick={clearAll}
            >
              Clear all
            </button>
          </div>
          <FilterControls />
        </aside>

        {/* PRODUCT GRID */}
        <div>
          <div className="listing-toolbar">
            <span className="listing-count">
              Showing <strong>{filtered.length} products</strong>
            </span>
            <div className="listing-sort">
              <button
                className="btn btn-ghost btn-sm filter-trigger"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
              <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                Sort:
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

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              className="filter-drawer-scrim"
              onClick={() => setFiltersOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="filter-drawer"
              initial={{ y: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.22, 0.7, 0.2, 1],
              }}
            >
              <div className="filter-drawer-handle" />
              <div className="filter-drawer-head">
                <span className="filter-title" style={{ margin: 0 }}>
                  Filters
                </span>
                <button
                  className="nav-icon-btn"
                  aria-label="Close filters"
                  onClick={() => setFiltersOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>
              <FilterControls />
              <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                <button
                  className="btn btn-ghost"
                  style={{ flex: 1 }}
                  onClick={clearAll}
                >
                  Clear all
                </button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => setFiltersOpen(false)}
                >
                  Show {filtered.length} results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Products;
