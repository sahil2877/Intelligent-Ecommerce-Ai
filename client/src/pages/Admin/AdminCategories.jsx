import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  const authHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setForm({ name: "", description: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return;

    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, form, authHeader());
        toast.success("Category updated");
      } else {
        await api.post("/categories", form, authHeader());
        toast.success("Category created");
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setForm({
      name: category.name,
      description: category.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await api.delete(`/categories/${id}`, authHeader());
      toast.success("Category deleted");
      if (editingId === id) resetForm();
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Category Management</div>
          <div className="admin-breadcrumb">
            Admin / <span>Categories</span>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: "start" }}>
        {/* Category List */}
        <div className="admin-table-card">
          <div className="admin-table-header">
            <div className="heading">All Categories</div>
            <span className="text-muted text-sm">
              {categories.length} categories
            </span>
          </div>
          <div>
            {categories.length === 0 ? (
              <div className="category-row">
                <span className="text-muted text-sm">No categories yet.</span>
              </div>
            ) : (
              categories.map((category) => (
                <div className="category-row" key={category._id}>
                  <div className="category-info">
                    <div className="category-icon-sm">🗂</div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--snow)",
                        }}
                      >
                        {category.name}
                      </div>
                      {category.description && (
                        <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                          {category.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add / Edit Form */}
        <div className="form-section" style={{ marginBottom: 0 }}>
          <div className="form-section-title">
            {editingId ? "Edit Category" : "Add New Category"}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-16">
              <label className="form-label">Category Name *</label>
              <input
                className="form-input"
                placeholder="e.g. Televisions"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-group mb-16">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Brief description of this category…"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-ghost w-full"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary w-full">
                {editingId ? "Update Category" : "Create Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminCategories;
