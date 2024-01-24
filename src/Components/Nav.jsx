import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Nav.css';

const Nav = () => {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/signUp');
  }


  return (
    <div>
      <ul className='nav-ul'>
        <li className='nav-li'><Link to="/">Products</Link></li>
        <li className='nav-li'><Link to="/add">Add Products</Link></li>
        <li className='nav-li'><Link to="/profile">Profile</Link></li>
        <li className='nav-li'>
          {
            auth ? <Link to='/signUp' onClick={logout}>Log out</Link> : <Link to="/signUp">SignUp</Link>
          }
        </li>
      </ul>
    </div>
  )
}

export default Nav
