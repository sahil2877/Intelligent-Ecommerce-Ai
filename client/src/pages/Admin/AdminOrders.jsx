import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api/axios";

function AdminOrders() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  const [orders, setOrders] =
    useState([]);

  const fetchOrders =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get(
            "/orders",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setOrders(
          res.data.orders
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchOrders();

  }, []);

  const updateStatus =
    async (
      orderId,
      status
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.put(
          `/orders/status/${orderId}`,
          {
            orderStatus:
              status
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        Manage Orders
      </h1>

      <table className="w-full border">

        <thead>

          <tr>

            <th>User</th>

            <th>Amount</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {orders.map(
            (order) => (

            <tr
              key={order._id}
            >

              <td>
                {order.user?.name}
              </td>

              <td>
                ₹{order.totalAmount}
              </td>

              <td>

                <select
                  value={
                    order.orderStatus
                  }
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >

                  <option>
                    Pending
                  </option>

                  <option>
                    Processing
                  </option>

                  <option>
                    Shipped
                  </option>

                  <option>
                    Delivered
                  </option>

                  <option>
                    Cancelled
                  </option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default AdminOrders;