import React, {useEffect} from 'react';
import './../styles/allproduct.css';
import {FaSearch, FaShoppingCart} from 'react-icons/fa';
import ProductCard from '../Components/ProductCard';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getAllProducts} from './../actions/productActions';

const AllProducts = () => {
	const {products} = useSelector(state => state.getAllProducts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<div className='allProducts'>
			<div className="allProducts__header">
				<div className="allProducts__headerLeft">
					<h1>Ricky Shop</h1>
				</div>
				<div className="allProducts__headerRight">
					<form>
						<input type="text" placeholder="PRODUCT" />
						<FaSearch />
					</form>
					<Link to='/cart'><FaShoppingCart /></Link>
				</div>
			</div>

			<div className="allProducts__main">
				<div className="allProducts__mainLeft">
					<p>FEATURED</p>
					<p>CATEGORY 1</p>
					<p>CATEGORY 2</p>
					<p>CATEGORY 3</p>
					<p>CATEGORY 4</p>
					<p>CATEGORY 5</p>
				</div>
				<div className="allProducts__mainMiddle">
					{  
						products.map(pr => (
							<ProductCard key={pr._id} id={pr._id} title={pr.title} price={pr.price} />
						))
					}

				</div>
				<div className="allProducts__mainRight">
					<p>ALL</p>
					<p>FILTER 1</p>
					<p>FILTER 2</p>
					<p>FILTER 3</p>
					<p>FILTER 4</p>
					<p>FILTER 5</p>
				</div>
			</div>
		</div>
	)
}

export default AllProducts;