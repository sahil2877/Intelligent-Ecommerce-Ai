const express = require("express");

const router = express.Router();

const {
    aiStylist
} = require(
    "../controllers/aiController"
);

router.post(
    "/stylist",
    aiStylist
);

module.exports = router;