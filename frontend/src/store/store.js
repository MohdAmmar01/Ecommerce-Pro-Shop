import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "../reducers/ProductSlice";
import usereducers from "../reducers/userSlice"
import {cartReducer} from "../reducers/cartSlice"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


const allreducers=combineReducers({"products":products,"cart":cartReducer,"users":usereducers})
const persistConfig = {
  key: 'root',
  storage
}

const pers = persistReducer(persistConfig, allreducers)
export default  configureStore({
    reducer: pers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  
        
  });