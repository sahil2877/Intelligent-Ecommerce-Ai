const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;

        cart.items.forEach((item) => {
            totalAmount +=
                item.product.price *
                item.quantity;
        });

        const order = await Order.create({
            user: req.user.id,

            items: cart.items.map((item) => ({
                product: item.product._id,
                quantity: item.quantity
            })),

            totalAmount
        });

        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const getMyOrders = async (req, res) => {
    try {

        const orders =
            await Order.find({
                user: req.user.id
            })
            .populate("items.product");

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const getAllOrders = async (req, res) => {
    try {

        const orders =
            await Order.find()
            .populate("user")
            .populate("items.product");

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const updateOrderStatus = async (
    req,
    res
) => {
    try {

        const order =
            await Order.findByIdAndUpdate(
                req.params.orderId,
                {
                    orderStatus:
                        req.body.orderStatus
                },
                {
                    new: true
                }
            );

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};