import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './../styles/mainpage.css'
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, logoutUser as logout} from './../actions/authActions';
import {useAlert} from 'react-alert';

const MainPage = () => {
  const {isAuthenticated, error} = useSelector(state => state.auth);
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
  
  return (
    <div>
      <div className="kesatu">
        {
          isAuthenticated ? (
            <>
              <div className="signinmainpage">
                <Link to='/' onClick={logoutUser}>Logout</Link>
              </div>
              <div className="createaccountmainpage">
                <Link to="/checkout">Previous Transaction</Link>
              </div>
            </>
          ) : (
            <>
              <div className="signinmainpage">
                <Link to="/login">SIGN IN</Link>
              </div>
              <div className="createaccountmainpage">
                <Link to="/register">Create Account</Link>
              </div>
            </>
          )
        }
        <div className="choose">
          <p>Choose <b>As You Want</b> Pay <b>As You Can</b></p>
        </div>
        <div className="shopp">
          <div className="untukshop">
            <div className="shop">
              <Link to='/products'>Shop Now</Link>
            </div>
          </div>
          <div className="concept"><p><b>New Concept</b> Of Online Shopping</p></div>
        </div>
      </div>

      <div className="lorem">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet.
      </div>

      <div className="box11">
        <Link to="" className="box-link">
          <div className="box">
            <div className="box-content">
              <h5>GALLERY</h5>
              <h5>SUBTITLE</h5>
            </div>
          </div>
        </Link>
      </div>

      <div className="box22">
        <Link to="" className="box-linkk">
          <div className="box">
            <div className="box-contentt">
              <h5>GALLERY</h5>
              <h5>SUBTITLE</h5>
            </div>
          </div>
        </Link>
      </div>

      <div className="box33">
        <Link to="" className="box-linkkk">
          <div className="box">
            <div className="box-contenttt">
              <h5>GALLERY</h5>
              <h5>SUBTITLE</h5>
            </div>
          </div>
        </Link>
      </div>
      
      <div className="footer">
        <img src={process.env.PUBLIC_URL + '/img/line.png'} alt='Line' />
        <div className="gambarpng">
          <Link to="">
            <img src={process.env.PUBLIC_URL + '/img/Group.png'} alt='Dot' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainPage;