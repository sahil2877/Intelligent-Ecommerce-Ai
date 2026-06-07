function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>

          <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500 text-purple-300">
            AI Powered Shopping
          </span>

          <h1 className="text-6xl md:text-7xl font-bold mt-6 leading-tight">
            Shop Smarter
            <span className="block text-purple-400">
              With AI
            </span>
          </h1>

          <p className="text-gray-300 text-lg mt-6">
            Discover personalized products,
            intelligent recommendations and
            seamless shopping experiences.
          </p>

          <div className="flex gap-4 mt-8">

            <button className="bg-purple-600 px-6 py-3 rounded-xl font-semibold">
              Explore Products
            </button>

            <button className="border border-white/20 px-6 py-3 rounded-xl">
              AI Stylist
            </button>

          </div>

        </div>

        <div className="flex justify-center">

          <div
            className="
            w-[350px]
            h-[350px]
            rounded-full
            bg-purple-600/30
            blur-3xl
            "
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;