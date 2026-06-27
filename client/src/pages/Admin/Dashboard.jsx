import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, IndianRupee } from "lucide-react";
import api from "../../api/axios";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  const kpis = [
    {
      icon: Users,
      bg: "rgba(16,185,129,.15)",
      label: "Total Users",
      value: stats?.totalUsers ?? "—",
    },
    {
      icon: Package,
      bg: "rgba(16,185,129,.15)",
      label: "Total Products",
      value: stats?.totalProducts ?? "—",
    },
    {
      icon: ShoppingCart,
      bg: "rgba(245,158,11,.15)",
      label: "Total Orders",
      value: stats?.totalOrders ?? "—",
    },
    {
      icon: IndianRupee,
      bg: "rgba(244,63,94,.15)",
      label: "Total Revenue",
      value:
        typeof stats?.totalRevenue !== "undefined"
          ? "₹" + Number(stats.totalRevenue).toLocaleString("en-IN")
          : "—",
    },
  ];

  const bars = [40, 55, 48, 70, 62, 85, 75, 90, 68, 100, 88, 72];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Dashboard</div>
          <div className="admin-breadcrumb">
            Welcome back, Admin — Here's what's happening today
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        {kpis.map((k) => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-icon" style={{ background: k.bg }}>
              <k.icon size={19} strokeWidth={1.8} />
            </div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid-2 mb-24">
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">Revenue — Last 12 Months</div>
          </div>
          <div className="chart-area">
            {bars.map((h, i) => (
              <div key={i} className="chart-bar" style={{ height: `${h}%` }}></div>
            ))}
          </div>
          <div className="chart-labels">
            {months.map((m) => (
              <span className="chart-label" key={m}>
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">Sales by Category</div>
          </div>
          <div className="donut-placeholder"></div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { c: "var(--primary)", n: "Laptops", v: "42%" },
              { c: "var(--violet)", n: "Smartphones", v: "23%" },
              { c: "var(--emerald)", n: "Audio", v: "15%" },
              { c: "var(--amber)", n: "Others", v: "20%" },
            ].map((leg) => (
              <div
                key={leg.n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div className="legend-dot" style={{ background: leg.c }}></div>
                  <span style={{ fontSize: "13px" }}>{leg.n}</span>
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--snow)",
                    fontWeight: 600,
                  }}
                >
                  {leg.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
