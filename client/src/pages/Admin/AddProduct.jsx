import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function AddProduct() {
  const [categories, setCategories] = useState([]);

  const [image, setImage] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

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

      alert("Product Added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
        flex
        flex-col
        gap-4
        "
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
        />

        <select
          name="category"
          onChange={handleChange}
          className="
  bg-white
  text-black
  p-3
  rounded
  "
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button
          type="submit"
          className="
          bg-purple-600
          py-3
          rounded-lg
          "
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
