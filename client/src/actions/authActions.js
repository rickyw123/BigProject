import {
    REGISTER_USER_FAIL,     
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CLEAR_ERROR
} from './../constants/auth';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST}); // kirim data ke reducer //axios buat panggil data dari api
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const {data} = await axios.post('/api/v1/auth/register', userData, config);  // config => biar kasih tahu server kalau userData yang dikirm adalah bentuk json (konversidata  ke json)
        dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_USER_REQUEST});
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const {data} = await axios.post('/api/v1/auth/login', userData, config);
        dispatch({type: LOGIN_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});
        const {data} = await axios.get('/api/v1/auth/me');
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({type: LOGOUT_USER_REQUEST});
        const {data} = await axios.get('/api/v1/auth/logout');
        dispatch({
            type: LOGOUT_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERROR});
}