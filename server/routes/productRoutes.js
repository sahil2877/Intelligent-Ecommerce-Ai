const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload =
require("../middleware/uploadMiddleware");

const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage
} = require("../controllers/productController");

router.post(
    "/",
    protect,
    adminOnly,
    createProduct
);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put(
    "/:id",
    protect,
    adminOnly,
    updateProduct
);
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteProduct
);
router.post(
   "/upload-image/:id",
   protect,
   adminOnly,
   upload.single("image"),
   uploadProductImage
);

module.exports = router;