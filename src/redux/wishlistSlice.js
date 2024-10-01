import { createSlice } from '@reduxjs/toolkit';

const getWishlistFromStorage = () => {
  try {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist === null) {
      return [];
    }
    return JSON.parse(storedWishlist);
  } catch (e) {
    console.warn("Could not load wishlist from localStorage", e);
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  try {
    const wishlistString = JSON.stringify(wishlist);
    localStorage.setItem('wishlist', wishlistString);
  } catch (e) {
    console.warn("Could not save wishlist to localStorage", e);
  }
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: getWishlistFromStorage(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.cityId === action.payload.cityId
      );
      if (!existingItem) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id || item.cityId !== action.payload.cityId
      );
      saveWishlistToStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
