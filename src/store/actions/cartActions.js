/**
 * Cart Action Types
 * Constants that define the type of actions that can be performed on the cart
 * These are used by reducers to determine which state update logic to execute
 */
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

/**
 * Action Creator: Add Product to Cart
 * Creates an action to add a product to the shopping cart
 * If the product already exists in cart, the reducer will increment its quantity
 * 
 * @param {Object} product - The product object to add to cart
 * @returns {Object} Action object with type and product payload
 */
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

/**
 * Action Creator: Remove Product from Cart
 * Creates an action to completely remove a product from the shopping cart
 * 
 * @param {number} productId - The unique identifier of the product to remove
 * @returns {Object} Action object with type and productId payload
 */
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

/**
 * Action Creator: Update Product Quantity
 * Creates an action to update the quantity of a specific product in the cart
 * The reducer will ensure the quantity doesn't go below 1
 * 
 * @param {number} productId - The unique identifier of the product
 * @param {number} quantity - The new quantity for the product (minimum 1)
 * @returns {Object} Action object with type and payload containing productId and quantity
 */
export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

/**
 * Action Creator: Clear Entire Cart
 * Creates an action to remove all items from the shopping cart
 * Typically used after order placement
 * 
 * @returns {Object} Action object with type CLEAR_CART (no payload needed)
 */
export const clearCart = () => ({
  type: CLEAR_CART,
});

