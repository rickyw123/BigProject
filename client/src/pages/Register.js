import React, {useState, useEffect} from 'react';
import Navbar from './../Components/Navbar';
import './../styles/auth.css';
import {useAlert} from 'react-alert';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser, clearErrors} from './../actions/authActions';

const Register = () => {
  const dispatch = useDispatch();
  const {loading, error, isAuthenticated} = useSelector(state => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
      if (error && error !== 'Invalid jsonwebtoken!') {
          alert.error(error);
          dispatch(clearErrors());
      }

      if (isAuthenticated) {
          history.push('/');
      }
  }, [dispatch, alert, error, isAuthenticated, history]);

  const handleSubmit = a => {
      a.preventDefault();
      dispatch(registerUser({name, email, password, confirmPassword}));
  }

  return (
    <>
      <Navbar />
      <div className='auth'>
        <div className="auth__left">
          <img src={process.env.PUBLIC_URL + '/img/Rickylogo.png'} alt="" />
        </div>
        <div className="auth__right">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="auth__inputGrou">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} autoComplete="off" />
            </div>
            <div className="auth__inputGroup">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" />
            </div>
            <div className="auth__inputGroup">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="auth__inputGroup">
              <label htmlFor="confirmPassword">Password Confirmation</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <button disabled={loading ? true : false} type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register;