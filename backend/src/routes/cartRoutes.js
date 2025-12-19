import express from 'express';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all cart routes
router.use(protect);

/**
 * @route   GET /api/cart
 * @desc    Get current user's cart items
 * @access  Private
 */
router.get('/', async (req, res, next) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id }).populate('product');
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/cart
 * @desc    Add a product to the shopping cart
 * @access  Private
 * @body    { productId: string, quantity?: number }
 */
router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'quantity must be at least 1' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Either create new cart item or update quantity if it already exists
    const cartItem = await CartItem.findOneAndUpdate(
      { user: req.user._id, product: productId },
      { $inc: { quantity } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate('product');

    return res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/cart/:productId
 * @desc    Update the quantity of a product in the cart
 * @access  Private
 * @body    { quantity: number }
 */
router.put('/:productId', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (quantity == null) {
      return res.status(400).json({ message: 'quantity is required' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'quantity must be at least 1' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    const cartItem = await CartItem.findOneAndUpdate(
      { user: req.user._id, product: productId },
      { quantity },
      { new: true }
    ).populate('product');

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found for this product' });
    }

    return res.json(cartItem);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/cart/:productId
 * @desc    Remove a product from the cart
 * @access  Private
 */
router.delete('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    const deleted = await CartItem.findOneAndDelete({
      user: req.user._id,
      product: productId,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Cart item not found for this product' });
    }

    return res.json({ message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
});

export default router;


