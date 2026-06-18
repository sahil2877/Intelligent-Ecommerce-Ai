import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      const product = res.data.product;

      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        brand: product.brand,
        stock: product.stock,
        category: product.category._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Edit Product</div>
          <div className="admin-breadcrumb">
            Admin / Products / <span>{formData.title}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>

      <div
        style={{
          background: "rgba(245,158,11,.08)",
          border: "1px solid rgba(245,158,11,.25)",
          borderRadius: "var(--radius)",
          padding: "12px 16px",
          marginBottom: "24px",
          fontSize: "13px",
          color: "var(--amber)",
        }}
      >
        ⚠️ You are editing a live product. Changes will be visible immediately on
        the storefront.
      </div>

      <div className="product-form-layout">
        <div>
          <div className="form-section">
            <div className="form-section-title">Basic Information</div>
            <div className="form-group mb-16">
              <label className="form-label">Product Name</label>
              <input
                className="form-input"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-16">
              <label className="form-label">Brand</label>
              <input
                className="form-input"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Pricing & Inventory</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Quantity</label>
                <input
                  className="form-input"
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="form-section">
            <div className="form-section-title">Status</div>
            <p className="text-muted text-sm">
              Update the product details and save your changes.
            </p>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Save Changes →
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProduct;
