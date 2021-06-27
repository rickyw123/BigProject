import React, {useEffect} from 'react';
import './../styles/checkout.css';
import Navbar from './../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {getUserTransactions} from './../actions/transactionActions';
import {useHistory} from 'react-router-dom';

const Checkout = () => {
  const {transactions, error} = useSelector(state => state.userTransactions);
  const {isAuthenticated} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
    if (error) {
      return alert.error(error);
    }
    dispatch(getUserTransactions());
  }, [dispatch, alert, error, history, isAuthenticated]);

  return (
    <>
      <Navbar />
      <div className="checkout">
        {
          !transactions ? (
            <h1>No Previous Transaction</h1>
          ) : (
            <>
            <h1>Checkout List</h1>
            <table cellSpacing="0" border="1">
              <thead>
                <tr>
                  <th>No</th>
                  <th>TransactionID</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  transactions.map((tran, i) => (
                    <tr key={tran._id}>
                      <td>{i+1}</td>
                      <td>{tran._id}</td>
                      <td>IDR {tran.total}</td>
                      <td>{tran.status}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            </>
          )
        }
      </div>
    </>
  )
}

export default Checkout;