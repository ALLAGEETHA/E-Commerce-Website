import { SET_CATEGORY_FILTER, CLEAR_CATEGORY_FILTER } from '../actions/filterActions';

/**
 * Initial State for Filter
 * Stores the currently selected category filter
 */
const initialState = {
  selectedCategory: null,
};

/**
 * Filter Reducer
 * Handles category filtering state
 * 
 * @param {Object} state - Current filter state
 * @param {Object} action - Action object
 * @returns {Object} New filter state
 */
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case CLEAR_CATEGORY_FILTER:
      return {
        ...state,
        selectedCategory: null,
      };

    default:
      return state;
  }
};

export default filterReducer;

