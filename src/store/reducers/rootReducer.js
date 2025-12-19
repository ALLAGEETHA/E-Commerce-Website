import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import searchReducer from './searchReducer';
import filterReducer from './filterReducer';

// Combine all reducers into root reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  search: searchReducer,
  filter: filterReducer,
});

export default rootReducer;

