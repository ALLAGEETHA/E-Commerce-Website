/**
 * Filter Action Types
 */
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER';
export const CLEAR_CATEGORY_FILTER = 'CLEAR_CATEGORY_FILTER';

/**
 * Action Creator: Set Category Filter
 * Sets the active category filter for product filtering
 * 
 * @param {string} category - The category name to filter by
 * @returns {Object} Action object with type and category payload
 */
export const setCategoryFilter = (category) => ({
  type: SET_CATEGORY_FILTER,
  payload: category,
});

/**
 * Action Creator: Clear Category Filter
 * Removes the active category filter to show all products
 * 
 * @returns {Object} Action object with type CLEAR_CATEGORY_FILTER
 */
export const clearCategoryFilter = () => ({
  type: CLEAR_CATEGORY_FILTER,
});

