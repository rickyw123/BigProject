import {
  CREATE_TRANSACTION_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAIL,
  CLEAR_ERRORS,
  GET_USER_TRANSACTIONS_REQUEST,
  GET_USER_TRANSACTIONS_SUCCESS,
  GET_USER_TRANSACTIONS_FAIL
} from './../constants/transaction';

export const transactionReducer = (state = {transaction: {}}, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION_REQUEST:
      return {
        loading: true
      }
    case CREATE_TRANSACTION_SUCCESS:
      return {
        loading: false,
        transaction: action.payload
      }
    case CREATE_TRANSACTION_FAIL:
      return {
        loading: false,
        transaction: null,
        error: action.payload
      }
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null
      }
    }
    default:
      return state;
  }
}

export const getUserTransactionsReducer = (state={transactions: []}, action) => {
  switch (action.type) {
    case GET_USER_TRANSACTIONS_REQUEST:
      return {
        loading: true
      }
    case GET_USER_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        transactions: action.payload
      }
    case GET_USER_TRANSACTIONS_FAIL:
      return {
        loading: false,
        transactions: null,
        error: action.payload
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