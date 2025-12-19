import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Auth middleware to protect routes using JWT tokens.
 * Expects an Authorization header in the form: "Bearer <token>"
 */
export const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token using JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shoppyglobe_secret');

      // Attach user (without password) to request object for downstream handlers
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found for this token' });
      }

      next();
      return;
    }

    return res.status(401).json({ message: 'Not authorized, token missing' });
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};


