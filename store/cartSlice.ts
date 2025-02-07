import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface CartItem {
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




interface CartState {
    items: CartItem[];
    cartIconImage: string | null;  // To store image for cart icon
}

const initialState: CartState = {
    items: [],
    cartIconImage: null,  // Default to null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const existingItem = state.items.find(
                (item) => item._id === action.payload._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            // Store the image for cart icon
            state.cartIconImage = action.payload.productImage;
        },

        removeItem: (state, action: PayloadAction<{ id: string }>) => {
            const existingItem = state.items.find(
                (item) => item._id === action.payload.id
            );

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        (item) => item._id !== action.payload.id
                    );
                }
            }

            // Update cartIconImage if necessary
            if (state.items.length > 0) {
                state.cartIconImage = state.items[0].productImage;  // Set to the first item's image
            } else {
                state.cartIconImage = null;  // Clear image if cart is empty
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.cartIconImage = null;  // Clear image when cart is cleared
        },
    }
});

export const { addItem, clearCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;



