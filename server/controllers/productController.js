const Product = require("../models/Product");

const createProduct = async (req, res) => {
    try {

        const {
            title,
            description,
            price,
            category,
            brand,
            stock
        } = req.body;

        const product = await Product.create({
            title,
            description,
            price,
            category,
            brand,
            stock
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createProduct
};