import React, {useEffect} from 'react'; 
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loadUser} from './actions/authActions';
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage'
import AllProducts from './pages/AllProducts';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProtectedRoute from './Components/ProtectedRoute';
import ProductDetail from './pages/ProductDetail';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser()); // supaya setiap kali browser direfresh, user data enggak hilang
  }, [dispatch]);

  // yang harus pakai reducer -> panggil API (register, login, addProduct, dsb)

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register} />
        <Route exact path='/products' component={AllProducts} />
        <Route exact path='/detail/:id' component={ProductDetail} />
        <ProtectedRoute isAdmin={true}  exact path='/dashboard' component={Dashboard} />
        <ProtectedRoute isAdmin={true} exact path='/admin/products' component={ProductList} />
        <ProtectedRoute isAdmin={true} exact path='/admin/product/add' component={AddProduct} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/checkout' component={Checkout} />
      </Switch>
    </Router>
  );
}

export default App;
