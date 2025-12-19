import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import productRoutes from './src/routes/productRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

// Load environment variables from .env if present
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Basic middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('dev'));  // Log HTTP requests (helpful for ThunderClient testing)

// Simple health check route
app.get('/', (req, res) => {
  res.json({ message: 'ShoppyGlobe API is running' });
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// 404 handler for unknown routes
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

// Use PORT from env or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`ShoppyGlobe API server running on port ${PORT}`);
});


