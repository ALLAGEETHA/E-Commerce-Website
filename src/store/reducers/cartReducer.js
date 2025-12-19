import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART } from '../actions/cartActions';

/**
 * Initial State for Cart
 * Defines the default structure of the cart state when the application starts
 * items: Array to store all products added to the cart
 */
const initialState = {
  items: [],
};

/**
 * Cart Reducer
 * Pure function that handles all cart-related state updates
 * Takes the current state and an action, returns the new state
 * 
 * Reducer Logic:
 * - ADD_TO_CART: Adds product to cart or increments quantity if already exists
 * - REMOVE_FROM_CART: Removes a product from cart by ID
 * - UPDATE_QUANTITY: Updates quantity of a specific product (minimum 1)
 * - CLEAR_CART: Removes all items from cart
 * 
 * @param {Object} state - Current cart state (defaults to initialState)
 * @param {Object} action - Action object with type and payload
 * @returns {Object} New cart state after applying the action
 */
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * ADD_TO_CART Case
     * Handles adding a product to the cart
     * - If product already exists: increment its quantity by 1
     * - If product is new: add it to cart with quantity 1
     */
    case ADD_TO_CART:
      // Check if the product already exists in the cart by comparing IDs
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Product exists: update the existing item's quantity
        // Map through items and increment quantity for matching product
        return {
          ...state, // Spread existing state to maintain immutability
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 } // Increment quantity
              : item // Keep other items unchanged
          ),
        };
      } else {
        // Product is new: add it to cart with initial quantity of 1
        // Spread existing items and add new product with quantity property
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    /**
     * REMOVE_FROM_CART Case
     * Removes a product from the cart completely
     * Filters out the item with matching productId
     */
    case REMOVE_FROM_CART:
      return {
        ...state,
        // Filter out the item with the matching ID, keep all others
        items: state.items.filter(item => item.id !== action.payload),
      };

    /**
     * UPDATE_QUANTITY Case
     * Updates the quantity of a specific product in the cart
     * Ensures quantity never goes below 1 (enforced by Math.max)
     */
    case UPDATE_QUANTITY:
      // Use Math.max to ensure quantity is at least 1
      // This prevents invalid quantities like 0 or negative numbers
      const newQuantity = Math.max(1, action.payload.quantity);
      
      return {
        ...state,
        // Map through items and update quantity for matching product
        items: state.items.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: newQuantity } // Update quantity
            : item // Keep other items unchanged
        ),
      };

    /**
     * CLEAR_CART Case
     * Removes all items from the cart
     * Typically called after order placement
     */
    case CLEAR_CART:
      return {
        ...state,
        items: [], // Reset items array to empty
      };

    /**
     * Default Case
     * Returns current state unchanged if action type doesn't match
     * This is important for handling actions from other reducers
     */
    default:
      return state;
  }
};

export default cartReducer;

