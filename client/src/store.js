import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // middleware untuk redux , thunk -> middleware redux buat security di browser
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducers';
import { productReducers, getAllProductsReducer } from './reducers/productReducers';
import {cartReducers} from './reducers/cartReducer';
import {transactionReducer, getUserTransactionsReducer} from './reducers/transactionReducers';

// setelah bikin reducer harus ke store buat simpan reducer

const reducers = combineReducers({
    auth: authReducer,
    product: productReducers,
    getAllProducts: getAllProductsReducer,
    cart: cartReducers,
    transaction: transactionReducer,
    userTransactions: getUserTransactionsReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
};
const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;

// store fungsinya untuk menyimpan segala sesuatu yang berhubungan dengan redux, reducer , initial state , middleware supaya kita bisa panggil data.