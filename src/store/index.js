import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './productsSlice';
import { cartSlice } from './cartSlice';
import { apiSlice } from './apiSlice';
// import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    //take all the reducers from productslice and attach to reducer products here
    cart: cartSlice.reducer,
    api: apiSlice.reducer,
    // user: userSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
