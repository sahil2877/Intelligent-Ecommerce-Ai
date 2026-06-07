import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/cart/add/${product._id}`,
        {
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Added to cart");
    } catch (error) {
      console.log(error);

      console.log(error.response);

      toast.error(error.response?.data?.message || "Failed to add cart");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/wishlist/add/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Added to wishlist");
    } catch (error) {
      toast.error("Failed to add wishlist");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);

        setProduct(res.data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  if (!product) {
    return <h1 className="text-center mt-20">Product Not Found</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="
            w-full
            rounded-2xl
            "
          />
        </div>

        <div>
          <h1
            className="
            text-5xl
            font-bold
            "
          >
            {product.title}
          </h1>

          <p
            className="
            text-gray-400
            mt-4
            "
          >
            {product.brand}
          </p>

          <p
            className="
            text-3xl
            font-bold
            text-purple-400
            mt-6
            "
          >
            ₹{product.price}
          </p>

          <p
            className="
            mt-6
            text-gray-300
            "
          >
            {product.description}
          </p>

          <p
            className="
            mt-6
            "
          >
            ⭐{product.averageRating || 0}
          </p>

          <div
            className="
            flex
            gap-4
            mt-8
            "
          >
            <button
              onClick={handleAddToCart}
              className="
  bg-purple-600
  px-6
  py-3
  rounded-xl
  "
            >
              Add To Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="
  border
  border-gray-600
  px-6
  py-3
  rounded-xl
  "
            >
              Add To Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
