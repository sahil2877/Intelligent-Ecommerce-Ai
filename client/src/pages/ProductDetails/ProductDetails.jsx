import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function ProductDetails() {
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

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

  const handleReview = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/reviews/${id}`,
        {
          rating: Number(rating),
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Review Added");

      setComment("");

      fetchReviews();
      fetchProduct();
    } catch (error) {
      toast.error(error.response?.data?.message || "Review Failed");
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
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/${id}`);

        setReviews(res.data.reviews);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
    fetchReviews();
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
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">
              Reviews ({reviews.length})
            </h2>

            <div className="flex flex-col gap-4 mb-8">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="
bg-white
text-black
p-2
rounded
"
              >
                <option value="5">5 Stars</option>

                <option value="4">4 Stars</option>

                <option value="3">3 Stars</option>

                <option value="2">2 Stars</option>

                <option value="1">1 Star</option>
              </select>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write review"
                className="
bg-white
text-black
p-3
rounded
"
              />

              <button
                onClick={handleReview}
                className="
      bg-purple-600
      px-4
      py-2
      rounded
      "
              >
                Submit Review
              </button>
            </div>

            {reviews.map((review) => (
              <div
                key={review._id}
                className="
      border
      border-gray-700
      p-4
      rounded
      mb-4
      "
              >
                <h3 className="font-bold">{review.user?.name}</h3>

                <p>⭐ {review.rating}</p>

                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
