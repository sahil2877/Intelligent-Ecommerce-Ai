import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ScrollToTop from "../components/ScrollToTop";

// Eager: core shopping flow (kept in the main chunk for instant nav)
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Orders from "../pages/Orders/Orders";
import Profile from "../pages/Profile/Profile";
import AIStylist from "../components/AIStylist/AIStylist";
import NotFound from "../pages/NotFound/NotFound";

// Lazy: checkout + the whole admin panel (split into separate chunks)
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const AdminProducts = lazy(() => import("../pages/Admin/AdminProducts"));
const AddProduct = lazy(() => import("../pages/Admin/AddProduct"));
const EditProduct = lazy(() => import("../pages/Admin/EditProduct"));
const AdminOrders = lazy(() => import("../pages/Admin/AdminOrders"));
const AdminCategories = lazy(() => import("../pages/Admin/AdminCategories"));

function RouteFallback() {
  return (
    <div className="container section-sm text-center text-muted">Loading…</div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/ai-stylist" element={<AIStylist />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/categories" element={<AdminCategories />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRoutes;
