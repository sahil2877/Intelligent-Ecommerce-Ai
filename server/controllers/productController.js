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
const getAllProducts = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const search = req.query.search || "";

        const query = {
            title: {
                $regex: search,
                $options: "i"
            }
        };

        const totalProducts =
            await Product.countDocuments(query);

        const products =
            await Product.find(query)
                .skip((page - 1) * limit)
                .limit(limit);

        res.status(200).json({
            success: true,
            totalProducts,
            currentPage: page,
            totalPages: Math.ceil(
                totalProducts / limit
            ),
            products
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createProduct,
    getAllProducts
};