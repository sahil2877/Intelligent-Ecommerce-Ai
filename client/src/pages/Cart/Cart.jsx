import { useEffect, useState } from "react";
import api from "../../api/axios";

function Cart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCart(res.data.cart);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/cart/update/${productId}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handlePlaceOrder =
async () => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    await api.post(
      "/orders/place-order",
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    alert(
      "Order placed successfully"
    );

  } catch (error) {

    console.log(error);

  }
};
  const total =
cart?.items?.reduce(
  (total, item) =>
    total +
    (
      item.product?.price *
      item.quantity
    ),
  0
) || 0;

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-10">My Cart</h1>

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
          <div
            className="
  flex
  justify-between
  items-center
  "
          >
            <div>
              <h2
                className="
      text-xl
      font-semibold
      "
              >
                {item.product?.title}
              </h2>

              <p>₹{item.product?.price}</p>
            </div>

            <div
              className="
    flex
    items-center
    gap-3
    "
            >
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity - 1)
                }
                className="
      px-3
      py-1
      bg-gray-700
      rounded
      "
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity + 1)
                }
                className="
      px-3
      py-1
      bg-gray-700
      rounded
      "
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.product._id)}
                className="
      bg-red-600
      px-4
      py-2
      rounded
      "
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <div
  className="
  mt-10
  text-right
  "
>

  <h2
    className="
    text-3xl
    font-bold
    "
  >
    Total:
    ₹{total}
  </h2>

 <button
  onClick={handlePlaceOrder}
  className="
  mt-4
  bg-purple-600
  px-6
  py-3
  rounded-xl
  "
>
  Proceed To Checkout
</button>
</div>
    </div>
  );
}

export default Cart;
