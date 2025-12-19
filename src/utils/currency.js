/**
 * Currency Utility Functions
 * Handles currency formatting for Indian Rupees (₹)
 */

/**
 * Formats a price value to Indian Rupees with proper formatting
 * Converts price to rupees (assuming API returns prices in USD, multiply by 83)
 * 
 * @param {number} price - The price value to format
 * @returns {string} Formatted price string with ₹ symbol (e.g., "₹499")
 */
export const formatPrice = (price) => {
  // Convert USD to INR (approximate conversion rate: 1 USD = 83 INR)
  const priceInRupees = price * 83;
  
  // Format to Indian number system (no decimals for whole numbers, 2 decimals otherwise)
  if (priceInRupees % 1 === 0) {
    return `₹${Math.round(priceInRupees).toLocaleString('en-IN')}`;
  }
  
  return `₹${priceInRupees.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Formats a price value with decimals always shown
 * @param {number} price - The price value to format
 * @returns {string} Formatted price string with ₹ symbol and 2 decimals
 */
export const formatPriceWithDecimals = (price) => {
  const priceInRupees = price * 83;
  return `₹${priceInRupees.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

