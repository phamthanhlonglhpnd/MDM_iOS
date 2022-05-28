import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slice/appSlice';
import {
  persistStore,
  persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
  app: appReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorageLib,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp', 'meta.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
        serializableCheck: false
      },
    }),
})

export const persistor = persistStore(store)

export default store;