import axios from 'axios';
import {
    ADD_TO_CART_SUCCESS, REMOVE_ITEM_FROM_CART
} from './../constants/cart';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/v1/product/${id}`);
    dispatch({
        type: ADD_TO_CART_SUCCESS,
        payload: {
            productId: data.product._id,
            title: data.product.title,
            price: data.product.price,
            stock: data.product.stock,
            image: data.product.image,
            quantity: qty
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: id
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}