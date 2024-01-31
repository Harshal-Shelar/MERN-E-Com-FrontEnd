import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';
import profileImg from '../../Assets/Images/pro3Trans.png'

const Nav = () => {
  const auth = localStorage.getItem("user");
  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  const openSidebar = () => {
    setSidebar(true);
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
                <li className='nav-li'><Link to="/">Product List</Link></li>
                <li className='nav-li'><Link to="/addProducts">Add Products</Link></li>
              </div>
              <div className='loginLogout'>
                <li className='nav-li'><Link to="/profile"> <i className="fa fa-user-circle-o"></i> {JSON.parse(auth).name}</Link></li>
              </div>
            </ul>
            <div className="respHeader">
              <img className='respProfileImg' src={profileImg} />
              <span className="respHeading">MERN CRUD</span>
              { !sidebar ?
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
    </div>
  )
}

export default Nav
