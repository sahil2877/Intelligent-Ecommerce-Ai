const express = require("express");

const router = express.Router();

const {
    createCategory,
    getCategories
} = require("../controllers/categoryController");

const protect =
    require("../middleware/authMiddleware");

const adminOnly =
    require("../middleware/adminMiddleware");

// Public
router.get("/", getCategories);

// Admin
router.post(
    "/",
    protect,
    adminOnly,
    createCategory
);

module.exports = router;