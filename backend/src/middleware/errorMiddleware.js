/**
 * Middleware for handling 404 (Not Found) routes.
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Centralized error handler.
 * Ensures all errors return a consistent JSON shape.
 */
export const errorHandler = (err, req, res, next) => {
  // If a previous middleware already set a status code, keep it; otherwise use 500.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message || 'Server Error',
    // Helpful stack trace only in development
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};


