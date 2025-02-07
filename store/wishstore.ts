import { configureStore } from '@reduxjs/toolkit';
import wishlistsReducer from './wishSlice';

export const wishstore = configureStore({
  reducer: {
    wishlists: wishlistsReducer,
  },
});

export type RootState = ReturnType<typeof wishstore.getState>;
export type AddDispatch = typeof wishstore.dispatch;
