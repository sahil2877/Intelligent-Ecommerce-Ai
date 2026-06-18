import { useEffect, useState } from "react";
import api from "../../api/axios";

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/orders/status/${orderId}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const countBy = (s) => orders.filter((o) => o.orderStatus === s).length;

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Order Management</div>
          <div className="admin-breadcrumb">
            Admin / <span>Orders</span>
          </div>
        </div>
      </div>

      <div className="kpi-grid mb-24">
        <div className="kpi-card">
          <div className="kpi-label">Pending</div>
          <div className="kpi-value" style={{ color: "var(--amber)" }}>
            {countBy("Pending")}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Processing</div>
          <div className="kpi-value" style={{ color: "var(--primary-lt)" }}>
            {countBy("Processing")}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Shipped</div>
          <div className="kpi-value" style={{ color: "var(--violet)" }}>
            {countBy("Shipped")}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Delivered</div>
          <div className="kpi-value" style={{ color: "var(--emerald)" }}>
            {countBy("Delivered")}
          </div>
        </div>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div className="heading">All Orders</div>
          <span className="text-muted text-sm">{orders.length} orders</span>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "var(--primary-lt)",
                    }}
                  >
                    #{order._id}
                  </span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: "var(--snow)" }}>
                    {order.user?.name}
                  </div>
                </td>
                <td style={{ fontWeight: 700, color: "var(--snow)" }}>
                  ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                </td>
                <td>
                  <select
                    className="form-select"
                    style={{ fontSize: "12px", padding: "6px 8px", width: "auto" }}
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminOrders;
