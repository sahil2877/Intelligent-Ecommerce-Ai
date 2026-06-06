const Product = require("../models/Product");
const cloudinary =
    require("../config/cloudinary");

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, brand, stock } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      brand,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
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
        $options: "i",
      },
    };

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const product =
    await Product.findById(req.params.id)
        .populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const uploadProductImage = async (
    req,
    res
) => {
    try {

        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {
            return res.status(404).json({
                message:
                    "Product not found"
            });
        }

        const result =
            await new Promise(
                (resolve, reject) => {

                    cloudinary.uploader
                        .upload_stream(
                            {
                                folder:
                                    "intelligent-ecommerce"
                            },
                            (
                                error,
                                result
                            ) => {

                                if (error)
                                    reject(error);

                                resolve(result);
                            }
                        )
                        .end(req.file.buffer);
                }
            );

        product.images.push(
            result.secure_url
        );

        await product.save();

        res.status(200).json({
            success: true,
            image:
                result.secure_url
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage
};
