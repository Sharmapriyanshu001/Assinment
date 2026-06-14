const Product = require('../models/Product');
const sendResponse = require('../utils/response');

// @desc    Get all products for logged-in user
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id }).sort({ createdAt: -1 });
    sendResponse(res, 200, true, 'Products fetched successfully', products);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const { name, type, quantity, mrp, price, brand, images, exchange, published } = req.body;

    const product = await Product.create({
      name,
      type,
      quantity,
      mrp,
      price,
      brand,
      images: images || [],
      exchange,
      published: published || false,
      user: req.user._id
    });

    sendResponse(res, 201, true, 'Product created successfully', product);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Make sure the product belongs to the user
    let product = await Product.findOne({ _id: id, user: req.user._id });

    if (!product) {
      return sendResponse(res, 404, false, 'Product not found');
    }

    product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    sendResponse(res, 200, true, 'Product updated successfully', product);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOne({ _id: id, user: req.user._id });

    if (!product) {
      return sendResponse(res, 404, false, 'Product not found');
    }

    await Product.deleteOne({ _id: id });

    sendResponse(res, 200, true, 'Product deleted successfully');
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

// @desc    Toggle publish status
// @route   PATCH /api/products/:id/publish
// @access  Private
const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findOne({ _id: id, user: req.user._id });

    if (!product) {
      return sendResponse(res, 404, false, 'Product not found');
    }

    product.published = !product.published;
    await product.save();

    sendResponse(res, 200, true, 'Product publish status updated successfully', product);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  togglePublish
};
