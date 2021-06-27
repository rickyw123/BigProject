import React from 'react';
import './../styles/dashboard.css';
import AdminSidebar from './../Components/AdminSidebar';
import AdminHeader from './../Components/AdminHeader';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="dashboard__left">
        <AdminSidebar />
      </div>
      <div className="dashboard__right">
        <AdminHeader />
        <div className="dashboard__rightContent">
          <h2>Dashboard</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;