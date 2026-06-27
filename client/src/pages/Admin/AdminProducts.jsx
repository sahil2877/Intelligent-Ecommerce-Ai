import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, ShoppingBag } from "lucide-react";
import api from "../../api/axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const stockBadge = (stock) => {
    if (!stock || stock <= 0)
      return <span className="badge badge-rose">Out of Stock</span>;
    if (stock <= 10)
      return <span className="badge badge-amber">Low Stock ({stock})</span>;
    return <span className="badge badge-success">In Stock ({stock})</span>;
  };

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Product Management</div>
          <div className="admin-breadcrumb">
            Admin / <span>Products</span>
          </div>
        </div>
        <Link to="/admin/add-product" className="btn btn-primary">
          <Plus size={16} strokeWidth={1.8} /> Add New Product
        </Link>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div className="heading">All Products</div>
          <div className="admin-table-actions">
            <span className="text-muted text-sm">
              {products.length} products
            </span>
          </div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="table-product-cell">
                    <div className="table-product-img">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.title} />
                      ) : (
                        <ShoppingBag size={18} strokeWidth={1.8} />
                      )}
                    </div>
                    <div>
                      <div className="table-product-name">{product.title}</div>
                      {product.brand && (
                        <div className="table-product-sku">{product.brand}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td>{product.category?.name}</td>
                <td style={{ color: "var(--snow)", fontWeight: 600 }}>
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </td>
                <td>{stockBadge(product.stock)}</td>
                <td>
                  <div className="table-actions">
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      className="btn btn-ghost btn-sm"
                    >
                      <Pencil size={15} strokeWidth={1.8} /> Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (window.confirm("Delete Product?")) {
                          deleteProduct(product._id);
                        }
                      }}
                    >
                      <Trash2 size={15} strokeWidth={1.8} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminProducts;
