import { useEffect, useState } from "react";
import api from "../../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.orders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-10">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="
          border
          border-gray-700
          p-5
          rounded-xl
          mb-4
          "
        >
          <p>
            Order ID:
            {order._id}
          </p>

          <p>
            Status:
            <span className="ml-2 font-bold">{order.orderStatus}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
