import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function AdminProducts() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

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

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1
        className="
        text-4xl
        font-bold
        mb-10
        "
      >
        Manage Products
      </h1>

      <Link
        to="/admin/add-product"
        className="
  bg-purple-600
  px-4
  py-2
  rounded-lg
  "
      >
        Add Product
      </Link>

      <table
        className="
        w-full
        border
        "
      >
        <thead>
          <tr>
            <th>Title</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <Link
                  to={`/admin/edit-product/${product._id}`}
                  className="
    bg-blue-600
    px-3
    py-2
    rounded
    mr-2
    "
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(product._id)}
                  className="
                  bg-red-600
                  px-4
                  py-2
                  rounded
                  "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
