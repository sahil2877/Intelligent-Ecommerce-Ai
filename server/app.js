const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Allow the SPA origin(s) to send/receive the httpOnly auth cookie.
// CLIENT_URL can be a comma-separated list for multiple deploy targets.
// Trailing slashes are stripped so "https://app.vercel.app/" and
// "https://app.vercel.app" are treated as the same origin.
const normalizeOrigin = (origin) => (origin || "").trim().replace(/\/+$/, "");

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

// Allow any *.vercel.app preview/prod URL as a safety net, so a missing or
// mismatched CLIENT_URL doesn't silently break login on every redeploy.
const isAllowedOrigin = (origin) => {
  const o = normalizeOrigin(origin);
  return allowedOrigins.includes(o) || /\.vercel\.app$/.test(o);
};

app.use(
  cors({
    origin: (origin, callback) => {
      // No origin = same-origin / curl / server-to-server: always allow.
      if (!origin || isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      console.warn(`[CORS] Blocked origin: ${origin}`);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Intelligent Ecommerce API Running",
  });
});

module.exports = app;
