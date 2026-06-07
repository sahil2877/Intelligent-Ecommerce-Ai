import { useEffect, useState } from "react";
import api from "../../api/axios";

function Cart() {

  const [cart, setCart] =
    useState(null);

  useEffect(() => {

    const fetchCart =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await api.get(
              "/cart",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            );

          setCart(
            res.data.cart
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchCart();

  }, []);

  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-10">
        My Cart
      </h1>

      {cart?.items?.map((item) => (

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
            {item.product?.title}
          </h2>

          <p>
            ₹{item.product?.price}
          </p>

          <p>
            Qty:
            {item.quantity}
          </p>

        </div>

      ))}

    </div>
  );
}

export default Cart;