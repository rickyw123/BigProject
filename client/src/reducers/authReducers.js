import {
    REGISTER_USER_FAIL,     // <= ini type
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERROR
} from './../constants/auth';

export const authReducer = (state={user: {}}, action) => {   // action bakal berisi data yang dikirim dari backend / server dan type
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
        case LOGIN_USER_REQUEST:
        case LOGOUT_USER_REQUEST:
            return {
                loading: true
            }
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case REGISTER_USER_FAIL:
        case LOAD_USER_FAIL:
        case LOGIN_USER_FAIL:
        case LOGOUT_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}