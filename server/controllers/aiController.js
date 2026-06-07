const Product =
require("../models/Product");

const {
    generateRecommendation
} = require("../services/aiService");

const aiStylist = async (
    req,
    res
) => {
    try {

        const { query } = req.body;

        const products =
        await Product.find()
        .select(
            "title description category price brand averageRating"
        );

        const recommendation =
        await generateRecommendation(
            query,
            products
        );

        res.status(200).json({
            success: true,
            recommendation
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    aiStylist
};