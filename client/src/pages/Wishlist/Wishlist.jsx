import { useEffect, useState } from "react";
import api from "../../api/axios";

function Wishlist() {

  const [wishlist, setWishlist] =
    useState([]);

  useEffect(() => {

    const fetchWishlist =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await api.get(
              "/wishlist",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );
            console.log(res.data);

          setWishlist(
  res.data.wishlist.products
);

        } catch (error) {

          console.log(error);

        }
        
      };

    fetchWishlist();

  }, []);

  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-10">
        My Wishlist
      </h1>

      {wishlist.map((item) => (

        <div
          key={item._id}
          className="
          border
          border-gray-700
          p-5
          rounded-xl
          mb-4
          "
        >

          <h2>
            {item.title}
          </h2>

          <p>
            ₹{item.price}
          </p>

        </div>

      ))}

    </div>
  );
}

export default Wishlist;