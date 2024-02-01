import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import profileImg from '../../Assets/Images/pro3Trans.png';


const Nav = () => {
  const auth = localStorage.getItem("user");
  const [sidebar, setSidebar] = useState(false);
  const [notification, setNotification] = useState(0);

  const openSidebar = () => {
    setSidebar(true);
  }

  const openNotification = () => {
    setNotification(true);
  }

  const closeSidebar = () => {
    setSidebar(false);
  }


  return (
    <div>
      {
        auth ?
          <div>
            <ul className='nav-ul'>
              <div className="all-li">
                <li className='nav-li logoOnly'><Link to="/">MERN</Link></li>
                <li className='nav-li'><Link to="/">Product List</Link></li>
                <li className='nav-li'><Link to="/addProducts">Add Products</Link></li>
              </div>
              <div className='loginLogout'>
                <li className='nav-li'><i className="fa fa-bell-o" onClick={openNotification}></i><span className='notificationCount'>0</span></li>
                <li className='nav-li'><Link to="/profile"> <i className="fa fa-user-circle-o"></i> {JSON.parse(auth).name}</Link></li>
              </div>
            </ul>
            <div className="respHeader">
              <img className='respProfileImg' src={profileImg} alt='' />
              <span className="respHeading">MERN CRUD</span>
              {!sidebar ?
                <i className='fa fa-bars' onClick={openSidebar}></i> : <></>
              }

              {sidebar ?
                <i className='fa fa-close' onClick={closeSidebar}></i> : <></>
              }
            </div>
            {
              sidebar ?
                <div className="respHeaderData">
                  <ul className='respUl'>
                    <li className='respLi' onClick={closeSidebar}><Link to="/"> <i className='fa fa-server'></i> Product List</Link></li>
                    <li className='respLi' onClick={closeSidebar}><Link to="/addProducts"> <i className='fa fa-user-plus'></i> Add Product</Link></li>
                    <li className='respLi' onClick={closeSidebar}><Link to="/profile"> <i className='fa fa-user-circle-o'></i> {JSON.parse(auth).name}</Link></li>
                  </ul>
                </div> :
                <></>
            }
          </div>
          :
          <></>
      }

      {
        notification ?
          <div className="overlay">
            <div className="popup">
              <div className="content">
                <p className='popupHeading'>Notification List</p>
                <button className='notificationClose' onClick={()=>setNotification(false)}>Close</button>
              </div>
            </div >
          </div > :
          <div></div>
      }
    </div>
  )
}

export default Nav
