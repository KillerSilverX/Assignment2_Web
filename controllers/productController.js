const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
};

const createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: 'Product not found' });
  }
};
// I tried everything and nothing worked for me :(
/*
const getProductsByName = async (req, res, keyword) => {
  try {
    const products = await Product.find({ name: keyword });
    if (products.length === 0) {
      return res.status(404).json({ message: `No products found with '${keyword}' in the name.` });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
*/

const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    res.json({ message: 'All products have been deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  //getProductsByName, :(
  deleteAllProducts,
};
