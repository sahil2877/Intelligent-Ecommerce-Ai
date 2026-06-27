import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import api from "../../api/axios";

const statusBadge = {
  Pending: "badge-amber",
  Processing: "badge-primary",
  Shipped: "badge-primary",
  Delivered: "badge-success",
  Cancelled: "badge-rose",
};

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
    <div className="container section-sm">
      <div className="eyebrow">Order History</div>
      <h1 className="display-md mb-32">My Orders</h1>

      {orders.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <ClipboardList size={36} strokeWidth={1.6} />
          </div>
          <h2 className="heading mb-8">No orders yet</h2>
          <p className="text-muted">Your placed orders will appear here.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-card-header">
              <div>
                <div className="order-num">#{order._id}</div>
                {order.createdAt && (
                  <div className="order-date">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}
              </div>
              <span
                className={
                  "badge " + (statusBadge[order.orderStatus] || "badge-muted")
                }
              >
                {order.orderStatus}
              </span>
            </div>
            {typeof order.totalAmount !== "undefined" && (
              <div className="order-card-footer">
                <div className="order-total">
                  ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
