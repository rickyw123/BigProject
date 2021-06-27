import React, {useEffect} from 'react';
import './../styles/cart.css';
import Navbar from './../Components/Navbar';
import CartCard from './../Components/CartCard';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {addTransaction, clearErrors} from './../actions/transactionActions';
import {useAlert} from 'react-alert';

const Cart = () => {
  const {cartItems} =  useSelector(state => state.cart);
  const {error} = useSelector(state => state.transaction);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const handleCheckout = () => {
    dispatch(addTransaction({
      userId: user._id,
      total: cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0),
      item: cartItems.map(ci => ({productId: ci.productId, qty: ci.quantity}))
    }));
    history.push('/checkout');
  }

  return (
    <>
      <Navbar />
      <div className='cart'>
        {
          cartItems.length === 0 ? (
            <h1>Cart is empty</h1>
          ) : (
            <>
              <div className="cart__left">
                {
                  cartItems.map(ci => (
                    <CartCard key={ci.productId} stock={ci.stock} id={ci.productId} image={ci.image} price={ci.price} qty={ci.quantity} title={ci.title}  />
                  ))
                }
              </div>
              <div className="cart__right">
                <div className="cart__rightHeader">
                  <h3>Cart Detail</h3>
                </div>
                <div className="cart__rightContent">
                  {
                    cartItems.map(ci => (
                      <div key={ci.productId} className="cart__rightDetail">
                        <p>{ci.title} (x{ci.quantity})</p>
                        <p>IDR {ci.price * ci.quantity}</p>
                      </div>
                    ))
                  }
                </div>
                <div className="cart__rightFooter">
                  <div className="cart__rightFooterDetail">
                    <h3>Total</h3>
                    <p>IDR {cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)}</p>
                  </div>
                  <button type="button" onClick={handleCheckout}>Checkout</button>
                  <div className="clear"></div>
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default Cart;