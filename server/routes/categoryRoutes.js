const express = require("express");

const router = express.Router();

const {
    createCategory,
    getCategories,
     updateCategory,
    deleteCategory
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
router.put(
    "/:id",
    protect,
    adminOnly,
    updateCategory
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteCategory
);

module.exports = router;