const Review = require("../models/Review");
const Product = require("../models/Product");

const addReview = async (req, res) => {
    try {

        const { rating, comment } = req.body;

        const productId = req.params.productId;

        const existingReview =
            await Review.findOne({
                user: req.user.id,
                product: productId
            });

        if (existingReview) {
            return res.status(400).json({
                message:
                    "You already reviewed this product"
            });
        }

        await Review.create({
            user: req.user.id,
            product: productId,
            rating,
            comment
        });

        const reviews =
            await Review.find({
                product: productId
            });

        let totalRating = 0;

        reviews.forEach((review) => {
            totalRating += review.rating;
        });

        const averageRating =
            totalRating / reviews.length;

        await Product.findByIdAndUpdate(
            productId,
            {
                averageRating,
                totalReviews: reviews.length
            }
        );

        res.status(201).json({
            success: true,
            message:
                "Review added successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const getProductReviews = async (
    req,
    res
) => {
    try {

        const reviews =
            await Review.find({
                product:
                    req.params.productId
            })
            .populate(
                "user",
                "name"
            );

        res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }
};
module.exports = {
    addReview,
    getProductReviews
};