const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    brand: {
        type: String
    },

    stock: {
        type: Number,
        default: 0
    },

    images: [
        {
            type: String
        }
    ],

    averageRating: {
        type: Number,
        default: 0
    },

    totalReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
   type: Boolean,
   default: false
},

discountPercentage: {
   type: Number,
   default: 0
}
},

{
    timestamps: true
}
);

module.exports = mongoose.model(
    "Product",
    productSchema
);