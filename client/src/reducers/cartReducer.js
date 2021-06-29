import {ADD_TO_CART_SUCCESS, REMOVE_ITEM_FROM_CART } from './../constants/cart';

export const cartReducers = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case ADD_TO_CART_SUCCESS:
            const item = action.payload;
            const isExists = state.cartItems.find(ci => ci.productId === item.productId);

            if (isExists) { // cek product apakah udah ada di cart atau belum
                return {
                    ...state,
                    cartItems: state.cartItems.map(ci => ci.productId === item.productId ? item : ci) 
                    // looping semua data yang ada di cartItem, dan mencari produk di cart berdasarkan ID, kalau id nya sama, dia akan mengambil data baru (new qty), kalau enggak sama, tetap ambil data produk sebelumnya yang ada di cart
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.productId !== action.payload) // === sama dengan !== tidak sama dengan
            }
        default:
            return state;
    }
}