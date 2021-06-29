import React, {useState, useEffect} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Link} from 'react-router-dom';
import {HiShoppingCart} from 'react-icons/hi';
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import {getSpecificProduct} from '../actions/productActions';
import {addToCart} from '../actions/cartActions';
import './../styles/detail.css';

const Detail = ({match}) => {
    const [sizeActive, setSizeActive] = useState(false);
    const [choosenSize, setChoosenSize] = useState('Small');
  
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, product} = useSelector(state => state.product);

    const handleChangeSize = size => {
        setChoosenSize(size);
        setSizeActive(false);
    }

    const handleAddToCart = () => {
        dispatch(addToCart(match.params.id, 1));
        alert.success('Item add to cart')
      }

    useEffect(() => {
        if (error && error !== 'Invalid jsonwebtoken!') {
            return alert.error(error);
        }

        dispatch(getSpecificProduct({id: match.params.id}));
    }, [dispatch, match.params.id, error, alert]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    return (
        <div className='detailContainer'>
            <Link to='/cart'>
                <HiShoppingCart />
            </Link>
            <div className="clear"></div>
            <div className="detailContainer-main">
                <div className="detailContainer-navbar">
                    <HiShoppingCart />
                    <HiShoppingCart />
                    <HiShoppingCart />
                </div>
                <div className="detailContainer-content">
                    <Slider {...settings}>
                        {
                            product?.image?.map(img => (
                                <div key={img._id}>
                                    <img src={img.url} alt='Product' />
                                </div>
                            ))
                        }
                    </Slider>
                    <div className="detailContainer-right">
                        <h1>{product?.title}</h1>
                        <p className='detailContainer-price'>IDR : {product?.price}</p>
                        <p className='detailContainer-description'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam laborum, optio debitis, eum vitae ducimus eius iure corrupti reiciendis aut ut quasi quae numquam alias pariatur mollitia repellat! Amet, expedita!
                        </p>
                        <div className="size-selector">
                            <p className="size">Size :</p>
                            <div className="size-main">
                                <h2 className="choosed-size" onClick={() => setSizeActive(!sizeActive)}>{choosenSize}</h2>
                                <div className={`size-list ${sizeActive && 'active'}`}>
                                    <button onClick={() => handleChangeSize('Small')}>Small</button>
                                    <button onClick={() => handleChangeSize('Medium')}>Medium</button>
                                    <button onClick={() => handleChangeSize('Large')}>Large</button>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleAddToCart} className='detailContainer-button'>Add To Cart</button>
                    </div>
                </div>
            </div>
            <button className='chatNowButton'>Chat Now</button>
        </div>
    )
}

export default Detail;