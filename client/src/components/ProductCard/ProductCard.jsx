function ProductCard({ product }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

      <div className="h-48 bg-gray-800 rounded-xl mb-4"></div>

      <h2 className="text-xl font-semibold">
        {product.title}
      </h2>

      <p className="text-gray-400">
        {product.brand}
      </p>

      <p className="text-2xl font-bold mt-2">
        ₹{product.price}
      </p>

      <button className="w-full mt-4 bg-purple-600 py-2 rounded-xl">
        View Product
      </button>

    </div>
  );
}

export default ProductCard;