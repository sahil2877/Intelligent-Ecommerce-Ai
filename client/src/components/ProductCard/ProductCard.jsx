import { useNavigate } from "react-router-dom";



function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="
      bg-[#111827]
      rounded-2xl
      overflow-hidden
      border border-gray-800
      hover:scale-105
      transition
      duration-300
      "
    >

      <div className="h-56 bg-gray-800">

        {product.images &&
        product.images.length > 0 ? (

          <img
            src={product.images[0]}
            alt={product.title}
            className="
            w-full
            h-full
            object-cover
            "
          />

        ) : (

          <div className="h-full flex items-center justify-center">
            No Image
          </div>

        )}

      </div>

      <div className="p-5">

        <h2 className="text-xl font-semibold">
          {product.title}
        </h2>

        <p className="text-gray-400 mt-2">
          {product.brand}
        </p>

        <p className="text-2xl font-bold mt-4 text-purple-400">
          ₹{product.price}
        </p>

        <button
  onClick={() =>
    navigate(`/products/${product._id}`)
  }
>
          View Product
        </button>

      </div>

    </div>
  );
}

export default ProductCard;