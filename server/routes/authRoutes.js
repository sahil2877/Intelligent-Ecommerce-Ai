const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    logoutUser
} = require("../controllers/authController");

router.post("/register", registerUser);
router.get("/profile", protect, getProfile);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;