import React, {useState, useEffect} from 'react';
import './../styles/adminheader.css';
import {AiOutlineCaretDown} from 'react-icons/ai';
import {IoLogOut} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {clearErrors, logoutUser as logout} from './../actions/authActions';
import {useAlert} from 'react-alert';
import {useHistory} from 'react-router-dom';

const AdminHeader = () => {
  const {error} = useSelector(state => state.auth);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
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
    <div className='adminHeader'>
      <div className="adminHeader__profile">
        <div className="adminHeader__top" onClick={() => setIsOpenProfile(!isOpenProfile)}>
          <div className="adminHeader__profileImage">
            {/* <img src="" alt="User Profile" /> */}
          </div>
          <div className="adminHeader__profileName">
            <p>Ricky</p>
            <AiOutlineCaretDown />
          </div>
        </div>
        <div className={`adminHeader__bottom  ${isOpenProfile ? 'adminHeader__bottom--active' : ''}`}>
          <Link to='/' onClick={logoutUser} className="adminHeader__bottomLink">
            <IoLogOut />
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader;