import React, {useState, useEffect} from 'react';
import Navbar from './../Components/Navbar';
import './../styles/auth.css';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, clearErrors} from './../actions/authActions';
import {useHistory} from 'react-router-dom';
import {useAlert} from 'react-alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const {loading, error, isAuthenticated, user} = useSelector(state => state.auth);

  useEffect(() => {
    if (error && error !== 'Invalid jsonwebtoken!') {
        alert.error(error);
        dispatch(clearErrors());
    }

    if (isAuthenticated) {
      if (user.role === 'admin') {
        history.push('/dashboard');
      } else {
        history.push('/');
      }
    }
}, [dispatch, alert, error, isAuthenticated, history, user]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser({email, password}));
  }

  return (
    <>
      <Navbar />
      <div className='auth'>
        <div className="auth__left">
          <img src={process.env.PUBLIC_URL + '/img/Rickylogo.png'} alt="" />
        </div>
        <div className="auth__right">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="auth__inputGroup">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" />
            </div>
            <div className="auth__inputGroup">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" disabled={loading ? true : false}>Sign In</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;