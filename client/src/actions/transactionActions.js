import {
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAIL,
  CLEAR_ERRORS,
  GET_USER_TRANSACTIONS_FAIL,
  GET_USER_TRANSACTIONS_REQUEST,
  GET_USER_TRANSACTIONS_SUCCESS
} from './../constants/transaction';
import axios from 'axios';

export const getUserTransactions = () => async (dispatch) => {
  try {
    dispatch({type: GET_USER_TRANSACTIONS_REQUEST});
    const {data} = await axios.get('/api/v1/transaction');
    dispatch({
      type: GET_USER_TRANSACTIONS_SUCCESS,
      payload: data.transactions
    })
  } catch (error) {
    dispatch({
      type: GET_USER_TRANSACTIONS_FAIL,
      payload: error.response.data.message
    })
  }
}

export const addTransaction = ({userId, total, item}) => async (dispatch) => {
  try {
    dispatch({type: CREATE_TRANSACTION_REQUEST});
    const tranData = {
      userId,
      item,
      total
    };
    const {data} = await axios.post('/api/v1/transaction', tranData);
    dispatch({
      type: CREATE_TRANSACTION_SUCCESS,
      payload: data.transaction
    });
    localStorage.setItem('cartItems', JSON.stringify([]));
  } catch (error) {
    dispatch({
      type: CREATE_TRANSACTION_FAIL,
      payload: error.response.data.message
    })
  }
}

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}