import { useEffect, useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

function AddProduct() {
  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data.categories);
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

      const productRes = await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const productId = productRes.data.product._id;

      if (image) {
        const imageData = new FormData();

        imageData.append("image", image);

        await api.post(`/products/upload-image/${productId}`, imageData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      toast.success("Product added");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Add New Product</div>
          <div className="admin-breadcrumb">
            Admin / Products / <span>Add New</span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          <Plus size={16} strokeWidth={1.8} /> Publish Product
        </button>
      </div>

      <div className="product-form-layout">
        {/* Left */}
        <div>
          <div className="form-section">
            <div className="form-section-title">Basic Information</div>
            <div className="form-group mb-16">
              <label className="form-label">Product Name *</label>
              <input
                className="form-input"
                type="text"
                name="title"
                placeholder="e.g. Apple MacBook Pro 16 M3 Max"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-16">
              <label className="form-label">Brand</label>
              <input
                className="form-input"
                type="text"
                name="brand"
                placeholder="e.g. Apple"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                name="description"
                rows="5"
                placeholder="Detailed product description…"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Pricing & Inventory</div>
            <div className="form-row mb-16">
              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
                <input
                  className="form-input"
                  type="number"
                  name="price"
                  placeholder="e.g. 349900"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Quantity *</label>
                <input
                  className="form-input"
                  type="number"
                  name="stock"
                  placeholder="0"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="form-section">
            <div className="form-section-title">Product Image</div>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ color: "var(--body)" }}
            />
          </div>

          <div className="form-section">
            <div className="form-section-title">Organisation</div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                name="category"
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Publish Product <ArrowRight size={16} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddProduct;
