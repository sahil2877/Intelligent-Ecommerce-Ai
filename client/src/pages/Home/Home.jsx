import Hero from "../../components/Hero/Hero";
import AIStylistBanner from "../../components/AIStylistBanner/AIStylistBanner";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";

function Home() {
  return (
    <>
      <Hero />

      <FeaturedProducts />

      <AIStylistBanner />
    </>
  );
}

export default Home;