import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(
  localStorage.getItem("user")
);

if (user?.role !== "admin") {
  return <Navigate to="/" />;
}

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const res =
           await api.get(
  "/dashboard/stats",
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
);

          setStats(res.data);

        } catch (error) {

          console.log(error);

        }
      };

    fetchStats();

  }, []);

  return (

    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
        "
      >

        <div className="bg-[#111827] p-6 rounded-xl">
          <h2>Total Users</h2>
          <p className="text-3xl font-bold">
            {stats?.totalUsers}
          </p>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl">
          <h2>Total Products</h2>
          <p className="text-3xl font-bold">
            {stats?.totalProducts}
          </p>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl">
          <h2>Total Orders</h2>
          <p className="text-3xl font-bold">
            {stats?.totalOrders}
          </p>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl">
          <h2>Total Revenue</h2>
          <p className="text-3xl font-bold">
            ₹{stats?.totalRevenue}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;