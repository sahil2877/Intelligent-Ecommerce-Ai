function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center text-center">

      <div className="max-w-4xl">

        <h1 className="text-7xl font-bold mb-8">
          Shop Smarter
          <span className="block text-purple-400">
            With AI
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-10">
          Discover products tailored to your style,
          budget and preferences using our
          AI Product Stylist.
        </p>

        <button
          className="
          bg-purple-600
          hover:bg-purple-700
          px-8
          py-4
          rounded-xl
          text-lg
          font-semibold
          "
        >
          Explore Products
        </button>

      </div>

    </section>
  );
}

export default Hero;