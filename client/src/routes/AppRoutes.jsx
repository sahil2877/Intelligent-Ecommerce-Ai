import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";

function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

        </Routes>

      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRoutes;