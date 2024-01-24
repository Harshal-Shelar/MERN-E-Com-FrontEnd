import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Nav.css'

const Nav = () => {
  return (
    <div>
      <ul className='nav-ul'>
        <li className='nav-li'><Link to="/">Products</Link></li>
        <li className='nav-li'><Link to="/add">Add Products</Link></li>
        <li className='nav-li'><Link to="/update">Update Products</Link></li>
        <li className='nav-li'><Link to="/logout">Logout</Link></li>
        <li className='nav-li'><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  )
}

export default Nav
