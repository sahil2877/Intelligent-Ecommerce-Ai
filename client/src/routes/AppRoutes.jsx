import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Cart from "../pages/Cart/Cart";

import Wishlist from "../pages/Wishlist/Wishlist";

import Orders from "../pages/Orders/Orders";

import Products from "../pages/Products/Products";

import ProductDetails from "../pages/ProductDetails/ProductDetails";

import Dashboard from "../pages/Admin/Dashboard";

import AdminProducts from "../pages/Admin/AdminProducts";

import AddProduct from "../pages/Admin/AddProduct";

import EditProduct from "../pages/Admin/EditProduct";

import AdminOrders from "../pages/Admin/AdminOrders";

import AdminCategories from "../pages/Admin/AdminCategories";

import Profile from "../pages/Profile/Profile";

import AIStylist from "../components/AIStylist/AIStylist";

function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/products" element={<Products />} />

          <Route path="/ai-stylist" element={<AIStylist />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/admin/products" element={<AdminProducts />} />

          <Route path="/admin/add-product" element={<AddProduct />} />

          <Route path="/admin/edit-product/:id" element={<EditProduct />} />

          <Route path="/admin/orders" element={<AdminOrders />} />

          <Route path="/admin/categories" element={<AdminCategories />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRoutes;
