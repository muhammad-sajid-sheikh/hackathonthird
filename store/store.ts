import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import wishlistsReducer from './wishSlice'

const store = configureStore({
    reducer:{
        cart:cartReducer,
        
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;
export default store

// //wishlist
// export const wishstore = configureStore({
//     reducer:{
    
//         wishlists: wishlistsReducer,
//     }
// });

// export type RootwishState = ReturnType<typeof wishstore.getState>
// export type AddwishDispatch = typeof wishstore.dispatch;
