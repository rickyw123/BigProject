import {
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    CLEAR_ERRORS,
    GET_ALL_PRODUCTS,
    GET_PRODUCT_DETAIL_FAIL,
    GET_PRODUCT_DETAIL_REQUEST,
    GET_PRODUCT_DETAIL_SUCCESS
} from './../constants/product';
import axios from 'axios';

export const addProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST });
        const config = {
            headers: {   //headers = mengirim data menjadi json
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('/api/v1/product', productData, config);
        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({ type: ADD_PRODUCT_FAIL, payload: error.response.data.message });
    }
}

export const getAllProducts = () => async (dispatch)  => {
    const {data} = await axios.get('/api/v1/product');

    dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data.products
    })
}

export const getSpecificProduct = ({id}) => async (dispatch) => {
    try {
        dispatch({type: GET_PRODUCT_DETAIL_REQUEST});
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type: GET_PRODUCT_DETAIL_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: GET_PRODUCT_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}