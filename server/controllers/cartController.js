const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const productId = req.params.productId;

    let cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });
    } else {
      const item = cart.items.find((item) => {
        return item.product && item.product.toString() === req.params.productId;
      });

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: 1,
        });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Product added to cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateCartQuantity = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    const item = cart.items.find(
      (item) => item.product.toString() === req.params.productId,
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity = req.body.quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Quantity updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId,
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
};
