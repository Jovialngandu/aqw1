import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import rootReducer from './rootReducer';

/**
 * Persist configuration
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'interactions'], // Only persist auth and interactions
  blacklist: ['articles'], // Don't persist articles (fetch fresh from API)
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Create Redux store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      // Add custom middleware here if needed
    ]),
});

/**
 * Create persistor
 */
export const persistor = persistStore(store);

export default store;
