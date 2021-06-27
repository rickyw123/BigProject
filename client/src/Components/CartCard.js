import React from 'react';
import './../styles/cartcard.css';
import {FaTrash} from 'react-icons/fa';
import {useDispatch} from 'react-redux';
import {addToCart, removeItemFromCart} from './../actions/cartActions';

const CartCard = ({id, image, price, qty, title, stock}) => {
  const dispatch = useDispatch();

  const handleDecreaseQty = () => {
    const newQty = qty - 1;
    if (newQty < 1) return;
    dispatch(addToCart(id, newQty));
  }

  const handleIncreaseQty = () => {
    const newQty = qty + 1;
    if (newQty > stock) return;
    dispatch(addToCart(id, newQty));
  }

  const handleRemove = () => {
    dispatch(removeItemFromCart(id));
  }

  return (
    <div className='cartCard'>
      <div className="cartCard__left">
        <img src={image[0].url} alt="Product" />
      </div>
      <div className="cartCard__right">
        <div className="cartCard__rightTop">
          <h2>{title}</h2>
          <FaTrash onClick={handleRemove} />
        </div>
        <p>IDR {price}</p>
        <form>
          <button type="button" onClick={handleDecreaseQty}>-</button>
          <input type="text" readOnly value={qty} />
          <button type='button' onClick={handleIncreaseQty}>+</button>
        </form>
      </div>
    </div>
  )
}

export default CartCard;