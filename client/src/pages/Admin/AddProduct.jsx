import { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

function AddProduct() {

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      price: "",
      brand: "",
      stock: "",
      category: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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

        await api.post(
          "/products",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Product Added"
        );

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
        >

          <option value="">
            Select Category
          </option>

          <option value="6a23bc746ea2447bdaa716e1">
            Smartphones
          </option>

          <option value="6a258002e8210754c3f4fac2">
            Laptops
          </option>

          <option value="6a258027e8210754c3f4fac3">
            Watches
          </option>

          <option value="6a25802de8210754c3f4fac4">
            Audio
          </option>

          <option value="6a258226f4ac105d65063e18">
            Gaming
          </option>

        </select>

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