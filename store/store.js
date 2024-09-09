import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';
import candidateReducer from './candidate/candidateSlice';
import createdCandidateReducer from './admin/adminSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Persist configuration for redux-persist
const persistConfig = {
  key: 'root', // The key to persist the root reducer
  storage, // The storage engine (defaults to localStorage for web)
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  candidate: candidateReducer,
  createdCandidate: createdCandidateReducer,
});

// Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
