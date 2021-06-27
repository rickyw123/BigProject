import React, {useEffect} from 'react'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loadUser} from './actions/authActions';
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage'
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser()); // /me
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register} />
        <Route exact path='/products' component={AllProducts} />
        <Route exact path='/product/detail/:id' component={ProductDetail} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/admin/products' component={ProductList} />
        <Route exact path='/admin/product/add' component={AddProduct} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/checkout' component={Checkout} />
      </Switch>
    </Router>
  );
}

export default App;
