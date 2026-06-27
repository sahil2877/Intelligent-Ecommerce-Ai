import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MobileBottomNav from "../components/MobileBottomNav/MobileBottomNav";
import AdminLayout from "./AdminLayout";

function MainLayout({ children }) {
  const { pathname } = useLocation();

  const isAdminRoute =
    pathname === "/dashboard" || pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}

export default MainLayout;
