const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const adminOnly =
    require("../middleware/adminMiddleware");

const {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} = require(
    "../controllers/orderController"
);

router.post(
    "/place-order",
    protect,
    placeOrder
);

router.get(
    "/my-orders",
    protect,
    getMyOrders
);

router.get(
    "/",
    protect,
    adminOnly,
    getAllOrders
);

router.put(
    "/status/:orderId",
    protect,
    adminOnly,
    updateOrderStatus
);

module.exports = router;