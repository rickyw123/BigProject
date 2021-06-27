import {
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAIL,
    CLEAR_ERRORS,
    GET_ALL_PRODUCTS,
    GET_PRODUCT_DETAIL_REQUEST,
    GET_PRODUCT_DETAIL_SUCCESS,
    GET_PRODUCT_DETAIL_FAIL
} from './../constants/product';

export const productReducers = (state = { product: {} }, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
        case GET_PRODUCT_DETAIL_REQUEST:
            return {
                loading: true
            }
        case ADD_PRODUCT_SUCCESS:
        case GET_PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: action.payload    // payload = data yang dikirim dari api, for best practice = payload
            }
        case ADD_PRODUCT_FAIL:
        case GET_PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
                product: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const getAllProductsReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case GET_ALL_PRODUCTS:
            return {
                products: action.payload //data yang dikirim dari action
            }
        default:
            return state;
    }
}