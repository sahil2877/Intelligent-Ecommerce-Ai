const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart
} = require(
    "../controllers/cartController"
);

router.post(
    "/add/:productId",
    protect,
    addToCart
);

router.get(
    "/",
    protect,
    getCart
);

router.put(
    "/update/:productId",
    protect,
    updateCartQuantity
);

router.delete(
    "/remove/:productId",
    protect,
    removeFromCart
);

module.exports = router;