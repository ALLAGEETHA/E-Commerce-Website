// Selector to get all cart items
export const selectCartItems = (state) => state.cart.items;

// Selector to get total number of items in cart
export const selectCartItemsCount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

// Selector to get total price of items in cart
export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Selector to check if product is in cart
export const selectIsInCart = (state, productId) => {
  return state.cart.items.some(item => item.id === productId);
};

