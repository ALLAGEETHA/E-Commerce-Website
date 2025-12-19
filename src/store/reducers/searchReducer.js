import { SET_SEARCH_QUERY } from '../actions/searchActions';

// Initial state for search
const initialState = {
  query: '',
};

// Search reducer to handle search query state
const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default searchReducer;

