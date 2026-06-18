import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/ProductCard/ProductCard";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);

        setWishlist(res.data.wishlist.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="container section-sm">
      <div className="flex justify-between items-center mb-32">
        <div>
          <div className="eyebrow">Saved Items</div>
          <h1 className="display-md">
            My Wishlist{" "}
            <span
              style={{
                fontSize: "18px",
                color: "var(--muted)",
                fontWeight: 400,
              }}
            >
              ({wishlist.length} items)
            </span>
          </h1>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">♡</div>
          <h2 className="heading mb-8">Your wishlist is empty</h2>
          <p className="text-muted">
            Save products you love and find them here later.
          </p>
        </div>
      ) : (
        <div className="grid-4">
          {wishlist.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
