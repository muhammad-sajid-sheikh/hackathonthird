import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishItem {
  _id: string;
  productImage: string;
  title: string;
  category?: string;
  description: string;
  price: number;
  priceline?: string;
  discountPercentage?: number;
  quantity: number;
}

interface WishState {
  items: WishItem[];
  cartIconImage: string | null;
}

const initialState: WishState = {
  items: [],
  cartIconImage: null,
};

export const wishSlice = createSlice({
  name: 'wishlists',
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<WishItem>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.cartIconImage = action.payload.productImage;
    },
    
    removeWishList: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(item => item._id !== action.payload.id);
      state.cartIconImage = state.items.length > 0 ? state.items[0].productImage : null;
    },
    clearWishList: state => {
      state.items = [];
      state.cartIconImage = null;
    },
  }
});

export const { addToWishList, clearWishList, removeWishList } = wishSlice.actions;
export default wishSlice.reducer;
