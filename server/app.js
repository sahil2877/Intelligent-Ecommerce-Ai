const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = 
    require("./routes/authRoutes");
const productRoutes = 
    require("./routes/productRoutes");
const categoryRoutes =
    require("./routes/categoryRoutes");
const wishlistRoutes =
    require("./routes/wishlistRoutes");
const cartRoutes =
    require("./routes/cartRoutes");    

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use(
    "/api/categories",
    categoryRoutes
);
app.use(
    "/api/wishlist",
    wishlistRoutes
);
app.use(
    "/api/cart",
    cartRoutes
);

app.get("/", (req, res) => {
    res.json({
        message: "Intelligent Ecommerce API Running"
    });
});

module.exports = app;