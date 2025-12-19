/**
 * Selector to get the selected category filter
 * @param {Object} state - Redux state
 * @returns {string|null} Selected category or null
 */
export const selectCategoryFilter = (state) => state.filter.selectedCategory;

