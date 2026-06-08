import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import api from "../../api/axios";

function EditProduct() {

  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      price: "",
      brand: "",
      stock: "",
      category: ""
    });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct =
    async () => {

      try {

        const res =
          await api.get(
            `/products/${id}`
          );

        const product =
          res.data.product;

        setFormData({
          title:
            product.title,
          description:
            product.description,
          price:
            product.price,
          brand:
            product.brand,
          stock:
            product.stock,
          category:
            product.category._id
        });

      } catch (error) {

        console.log(error);

      }

    };

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.put(
          `/products/${id}`,
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Product Updated"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (
    <div className="max-w-3xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="
          bg-green-600
          py-3
          rounded-lg
          "
        >
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;