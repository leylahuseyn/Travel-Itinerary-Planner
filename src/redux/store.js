import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from '../redux/wishlistSlice';

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
  },
});

export default store;