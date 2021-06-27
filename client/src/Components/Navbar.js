import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './../styles/navbar.css';
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, logoutUser as logout} from './../actions/authActions';
import {useAlert} from 'react-alert';

const Navbar = () => {
  const {isAuthenticated, error} = useSelector(state => state.auth);
  const [url, setUrl] = useState('');
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && error !== 'Invalid jsonwebtoken!') {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const logoutUser = () => {
    dispatch(logout());
    history.push('/');
    alert.success('Logout Success!');
  }

  useEffect(() => {
    const newUrl = window.location.href.split('/').pop();
    setUrl(newUrl);
  }, []);

  return (
    <div className='navbar'>
      <h1>INTIKOM</h1>
      
      <div className="navbarhome">
          <Link to='/'>Home</Link>
      </div>

      <div className="navbar1">
        {
          isAuthenticated ? (
            <Link to='/' onClick={logoutUser}>Logout</Link>
          ) : (
            <Link to={url === 'register' ? '/login' : '/register'}>{url === 'register' ? 'Sign In' : 'Sign Up'}</Link>
          )
        }
      </div>
    </div>
  )
}

export default Navbar;