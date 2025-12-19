// Search action types
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

// Set search query
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

