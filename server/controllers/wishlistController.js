const Wishlist = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
    try {

        const userId = req.user.id;

        const productId = req.params.productId;

        let wishlist =
            await Wishlist.findOne({
                user: userId
            });

        if (!wishlist) {

            wishlist =
                await Wishlist.create({
                    user: userId,
                    products: [productId]
                });

        } else {

            if (
                !wishlist.products.includes(productId)
            ) {
                wishlist.products.push(productId);

                await wishlist.save();
            }
        }

        res.status(200).json({
            success: true,
            message: "Product added to wishlist"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const getWishlist = async (req, res) => {
    try {

        const wishlist =
            await Wishlist.findOne({
                user: req.user.id
            }).populate("products");

        res.status(200).json({
            success: true,
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const removeFromWishlist = async (req, res) => {
    try {

        const wishlist =
            await Wishlist.findOne({
                user: req.user.id
            });

        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found"
            });
        }

        wishlist.products =
            wishlist.products.filter(
                (product) =>
                    product.toString() !==
                    req.params.productId
            );

        await wishlist.save();

        res.status(200).json({
            success: true,
            message:
                "Product removed from wishlist"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};