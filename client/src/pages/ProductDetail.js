import React, {useState, useEffect} from 'react';
import './../styles/productdetail.css';
import {Link} from 'react-router-dom';
import {HiShoppingCart} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import {useAlert} from 'react-alert';
import {getSpecificProduct} from './../actions/productActions';
import {addToCart} from './../actions/cartActions';

const ProductDetail = ({match}) => {
  const [sizeActive, setSizeActive] = useState(false);
  const [choosenSize, setChoosenSize] = useState('Small');
  const image = ['img.jpeg', 'search.png'];
  const [currentImage, setCurrentImage] = useState(0);
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error, product} = useSelector(state => state.product);

  useEffect(() => {
    if (error && error !== 'Invalid jsonwebtoken!') {
      return alert.error(error);
    }

    dispatch(getSpecificProduct({id: match.params.id}));
  }, [dispatch, match.params.id, error, alert]);

  const handleChangeSize = size => {
    setChoosenSize(size);
    setSizeActive(false);
  }

  const handleChangeImage = type => {
    if (type === 'left') {
      if (currentImage === 0) {
        setCurrentImage(image.length-1);
      } else {
        const newImg = currentImage - 1;
        setCurrentImage(newImg);
      }
    } else {
      if (currentImage === image.length - 1) {
        setCurrentImage(0);
      } else {
        const newImg = currentImage + 1;
        setCurrentImage(newImg);
      }
    }
  }

  const handleAddToCart = () => {
    dispatch(addToCart(match.params.id, 1));
    alert.success('Item add to cart')
  }

  return (
    <div className='test-container'>
      <div className="shopping-cart">
        <Link to='/cart'>
          <HiShoppingCart />
        </Link>
      </div>
      <main>
        <div className="left-content">
          <img src={process.env.PUBLIC_URL + `/img/${image[currentImage]}`} alt="Product"/>
          <button onClick={() => handleChangeImage('left')}>&lt;</button>
          <button onClick={() => handleChangeImage('right')}>&gt;</button>
        </div>
        <div className="right-content">
          <h2>Color</h2>
          <h2 className='item-type'>Item Type / Name</h2>
          <h3 className="price">$19.99</h3>
          <h3 className="beforePrice">$30.99</h3>
          <p className="short-desc">IDR {product?.price}</p>
          <p className="long-desc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque dolor magnam voluptates voluptatum autem molestias blanditiis inventore dolorum impedit non iste minus quidem, qui facere! Consequuntur quos sequi sit quas!
          </p>
          <div className="size-selector">
            <p className="size">Size</p>
            <h2 className="choosed-size" onClick={() => setSizeActive(!sizeActive)}>{choosenSize}</h2>
            <div className={`size-list ${sizeActive && 'active'}`}>
              <button onClick={() => handleChangeSize('Small')}>Small</button>
              <button onClick={() => handleChangeSize('Medium')}>Medium</button>
              <button onClick={() => handleChangeSize('Large')}>Large</button>
            </div>
          </div>
          <button onClick={handleAddToCart}>Add To Cart</button>

        </div>
      </main>
    </div>
  )
}

export default ProductDetail;