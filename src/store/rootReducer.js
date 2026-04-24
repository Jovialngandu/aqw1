import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import articlesReducer from './slices/articlesSlice';
// import interactionsReducer from './slices/interactionsSlice';

/**
 * Root reducer combining all slices
 */
const rootReducer = combineReducers({
  auth: authReducer,
//   articles: articlesReducer,
//   interactions: interactionsReducer,
});

export default rootReducer;
