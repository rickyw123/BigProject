import React from 'react'
import DashboardMenu from './../Components/DashboardMenu';
import {FaBoxOpen, FaBoxes, FaTachometerAlt, FaPlusCircle} from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <>
    <div className="dashboard__companyName">
        <h2>Ricky Shop</h2>
      </div>
      <div className="dashboard__leftMenus">
        <DashboardMenu Icon={FaTachometerAlt} text='Dashboard' link='/dashboard' />
        <DashboardMenu
          Icon={FaBoxOpen} 
          text='Products'
          subMenu={
            [
              {
                text: 'Product List',
                Icon: FaBoxes,
                link: '/admin/products'
              },
              {
                text: 'Add Product',
                Icon: FaPlusCircle,
                link: '/admin/product/add'
              }
            ]
          }
        />
      </div>
    </>
  )
}

export default AdminSidebar
