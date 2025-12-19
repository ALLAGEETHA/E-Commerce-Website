import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Fetch all products
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Fetch details for a single product by ID
 * @access  Public
 */
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router;


