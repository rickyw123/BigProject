import React from 'react';
import './../styles/productcard.css';
import {Link} from 'react-router-dom';

const ProductCard = ({id, title, price}) => {
  return (
    
    <Link to={`/detail/${id}`} className='productCard'>
      <h3>{title}</h3>
      <p>IDR {price}</p>
    </Link>
  )
}

export default ProductCard;