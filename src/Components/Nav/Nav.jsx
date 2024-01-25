import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/signUp');
  }


  return (
    <div>
      {
        auth ?
          <ul className='nav-ul'>
            <div className="all-li">
              <li className='nav-li'><Link to="/">Products</Link></li>
              <li className='nav-li'><Link to="/addProducts">Add Products</Link></li>
            </div>
            <div className='loginLogout'>
              <li className='nav-li'><Link to="/profile"> <i class="fa fa-user-circle-o"></i> {JSON.parse(auth).name}</Link></li>
              <li><Link to='/signUp' onClick={logout}>Log out</Link></li>
            </div>
          </ul>
          :
          <></>
      }

    </div>
  )
}

export default Nav
