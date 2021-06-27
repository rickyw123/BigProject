import {ADD_TO_CART_SUCCESS, REMOVE_ITEM_FROM_CART } from './../constants/cart';

export const cartReducers = (state = {cartItems: []}, action) => {
    switch (action.type) {
        case ADD_TO_CART_SUCCESS:
            const item = action.payload;
            const isExists = state.cartItems.find(ci => ci.productId === item.productId);

            if (isExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(ci => ci.productId === item.productId ? item : ci)
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
                cartItems: state.cartItems.filter(item => item.productId !== action.payload)
            }
        default:
            return state;
    }
}