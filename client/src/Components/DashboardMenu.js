import React, {useState} from 'react';
import './../styles/dashboardmenu.css';
import {AiOutlineCaretDown} from 'react-icons/ai';
import {Link} from 'react-router-dom';

const DashboardMenu = ({Icon, text, link, subMenu}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  return (
    <div className='dashboardMenu'>
      {
        subMenu ? (
          <div className="dashboardMenu__top" onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
            <div className="dashboardMenu__left">
              <Icon />
              <p>{text}</p>
            </div>
            <div className={`dashboardMenu__right ${isOpenDropdown ? 'dashboardMenu__right--active' : ''}`}>
              <AiOutlineCaretDown />
            </div>
          </div>
        ) : (
          <Link to={link} className='dashboardMenu__singleLink'>
            <Icon />
            <p>{text}</p>
          </Link>
        )
      }
      
      {
        subMenu && <>
          <div className={`dashboardMenu__bottom ${isOpenDropdown ? 'dashboardMenu__bottom--active' : ''}`}>
          {
            subMenu.map((sm, key) => (
              <div key={key}>
                <Link to={sm.link} className="dashboardMenu__bottomLink">
                  <sm.Icon />
                  <p>{sm.text}</p>
                </Link>
              </div>
            ))
          }
          </div>
        </>
      }
    </div>
  )
}

export default DashboardMenu;